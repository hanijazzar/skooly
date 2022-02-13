import { Op } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { ObjectLiteral } from '../../common/types';
import { HeaderData } from '../../common/interfaces';
import { LoggerService } from 'src/providers/logger.service';
import { Responses, ReturnResponses } from 'src/common/responses';
import { IStudent, StudentDto, StudentsDto } from './dto';
import { Student } from 'src/models/student.model';
import { StudentFamilyMember } from 'src/models/student-family-member.model';

@Injectable()
export class StudentsService {
    constructor(private logger: LoggerService) {}

    async getStudents(queryParams: StudentsDto, locals: HeaderData): Promise<Responses> {
        try {
            this.logger.info(`Preparing to get students:..`);

            let { count, page } = queryParams;
            count = Number(count) || 15;
            page = Number(page) - 1 || 0;

            const studentsDb = await Student.findAll({
                order: [['id', 'DESC']],
                raw: true,
                offset: count * page,
                limit: count,
            });

            const studentsCount = await Student.count();

            const studentsRes = studentsDb.map((student) => {
                return {
                    id: student['id'],
                    firstName: student['firstName'],
                    lastName: student['lastName'],
                    nationality: student['nationality'],
                    dateOfBirth: student['dateOfBirth'],
                    status: student['status'],
                };
            });

            const payload = {
                students: studentsRes,
                meta: {
                    currentPage: page + 1,
                    totalPages: Math.ceil(studentsCount / count),
                    limit: count,
                    totalData: studentsCount,
                },
            };

            return new ReturnResponses().emitSuccess(payload);
        } catch (error) {
            this.logger.error(`Internal server error in getStudents: ${error.message}`);
            return new ReturnResponses().emitInternalServerError();
        }
    }

    async searchStudents(queryParams: StudentsDto, locals: HeaderData): Promise<Responses> {
        try {
            let { count, page, searchTerm } = queryParams;
            count = Number(count) || 15;
            page = Number(page) - 1 || 0;

            const studentsDb = await Student.findAll({
                where: {
                    [Op.or]: [
                        { firstName: { [Op.like]: `%${searchTerm}%` } },
                        { lastName: { [Op.like]: `%${searchTerm}%` } },
                    ],
                },
                // order: [['id', 'DESC']],
                raw: true,
                offset: count * page,
                limit: count,
            });

            const studentsCount = await Student.findAndCountAll({
                where: {
                    [Op.or]: [
                        { firstName: { [Op.like]: `%${searchTerm}%` } },
                        { lastName: { [Op.like]: `%${searchTerm}%` } },
                    ],
                },
            });

            const studentsRes = studentsDb.map((student) => {
                return {
                    id: student['id'],
                    firstName: student['firstName'],
                    lastName: student['lastName'],
                    nationality: student['nationality'],
                    dateOfBirth: student['dateOfBirth'],
                    status: student['status'],
                };
            });

            const payload = {
                students: studentsRes,
                meta: {
                    currentPage: page + 1,
                    totalPages: Math.ceil(studentsCount.count / count),
                    limit: count,
                    totalData: studentsCount.count,
                },
            };

            return new ReturnResponses().emitSuccess(payload);
        } catch (error) {
            this.logger.error(`Internal server error in getStudents: ${error.message}`);
            return new ReturnResponses().emitInternalServerError();
        }
    }

    async getStudent(studentId: number, locals: HeaderData): Promise<Responses> {
        try {
            let student = await Student.findOne({
                where: { id: studentId, deletedAt: null },
                include: [
                    {
                        model: StudentFamilyMember,
                        required: false,
                        as: 'studentFamilyMembers',
                        where: {
                            studentId,
                            deletedAt: null,
                        },
                        attributes: ['id', 'firstName', 'lastName', 'relationship', 'nationality'],
                    },
                ],
            });
            if (!student) {
                return new ReturnResponses().emitDBCustomError('Student not found');
            }

            return new ReturnResponses().emitSuccess(student);
        } catch (error) {
            this.logger.error(`Internal server error in getStudents: ${error.message}`);
            return new ReturnResponses().emitInternalServerError();
        }
    }

    async saveStudent(bodyParams: StudentDto, locals: HeaderData, studentId?: number): Promise<Responses> {
        try {
            const { firstName, lastName, nationality, dateOfBirth, status, familyMembers } = bodyParams;
            const { role } = locals;

            let student = new Student();

            if (studentId) {
                student = await Student.findOne({
                    where: { id: studentId, deletedAt: null },
                });
                if (!student) {
                    return new ReturnResponses().emitDBCustomError('Student not found');
                }
            }

            student.firstName = firstName;
            student.lastName = lastName;
            student.nationality = nationality;
            student.dateOfBirth = dateOfBirth;
            // typically we would get the user's auth token and the auth service will check the user's role in the db
            if (role === 'registrar') {
                student.status = status;
            } else {
                student.status = 'pending_approval';
            }

            await student.save();
            const addedStudentId = student.id;

            await StudentFamilyMember.destroy({
                where: { studentId: addedStudentId },
            });

            if (familyMembers && familyMembers.length > 0) {
                familyMembers.forEach(async (familyMember) => {
                    let newFamilyMember = new StudentFamilyMember();
                    newFamilyMember.firstName = familyMember.firstName;
                    newFamilyMember.lastName = familyMember.lastName;
                    newFamilyMember.nationality = familyMember.nationality;
                    newFamilyMember.relationship = familyMember.relationship;
                    newFamilyMember.studentId = addedStudentId;
                    await newFamilyMember.save();
                });
            }

            return new ReturnResponses().emitSuccess(student);
        } catch (error) {
            this.logger.error(`Internal server error in saveStudent: ${error.message}`);
            return new ReturnResponses().emitInternalServerError();
        }
    }

    async deleteStudent(studentId: number, locals: HeaderData): Promise<Responses> {
        try {
            if (!studentId) {
                return new ReturnResponses().emitDBCustomError('Student not found');
            }

            const student = await Student.findOne({
                where: { id: studentId, deletedAt: null },
            });

            await student.destroy();
            await StudentFamilyMember.destroy({
                where: { studentId: studentId },
            });

            return new ReturnResponses().emitSuccess({});
        } catch (error) {
            this.logger.error(`Internal server error in saveStudent: ${error.message}`);
            return new ReturnResponses().emitInternalServerError();
        }
    }
}
