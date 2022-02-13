import { ObjectLiteral } from '../../common/types';
import { Response as ExpressResponse } from 'express';
import { HeaderData } from '../../common/interfaces';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Response } from '@nestjs/common';
import { StudentDto, StudentsDto } from './dto';
import { StudentsService } from './students.service';

@Controller()
export class StudentsController {
    constructor(private studentsService: StudentsService) {}

    /**
     * A method that fetches the students from the database
     * @param queryParams query parameters including page and count for pagination
     * @returns A response with the list of students
     */
    @Get('/api/students')
    async getStudents(@Query() queryParams: StudentsDto, @Response() res: ExpressResponse): Promise<ExpressResponse> {
        const locals = res.locals as HeaderData;
        const response = await this.studentsService.getStudents(queryParams, locals);
        return res.status(200).json(response);
    }

     /**
     * A method that searches for students in the database
     * @param queryParams query parameters including page and count for pagination and searchTerm
     * @returns A response with the list of students
     */
      @Get('/api/students/search')
      async searchStudents(@Query() queryParams: StudentsDto, @Response() res: ExpressResponse): Promise<ExpressResponse> {
          const locals = res.locals as HeaderData;
          const response = await this.studentsService.searchStudents(queryParams, locals);
          return res.status(200).json(response);
      }

    /**
     * A method that fetches a single student from the database
     * @param id The id of the student
     * @returns A response with the student info
     */
    @Get('/api/students/:id')
    async getStudent(@Param('id') studentId: number, @Response() res: ExpressResponse): Promise<ExpressResponse> {
        const locals = res.locals as HeaderData;
        const response = await this.studentsService.getStudent(studentId, locals);
        return res.status(200).json(response);
    }

    /**
     * A method that adds a student to the database
     * @param bodyParams The data of the student as in the StudentDto
     * @returns A response with the student data
     */
    @Post('/api/students')
    async addStudent(@Body() bodyParams: StudentDto, @Response() res: ExpressResponse): Promise<ExpressResponse> {
        const locals = res.locals as HeaderData;
        const response = await this.studentsService.saveStudent(bodyParams, locals);
        return res.status(200).json(response);
    }

    /**
     * A method that updates a student in the database
     * @param id The id of the student
     * @param bodyParams The data of the student as in the StudentDto
     * @returns A response with the student data
     */
    @Put('/api/students/:id')
    async updateStudent(
        @Param('id') studentId: number,
        @Body() bodyParams: StudentDto,
        @Response() res: ExpressResponse,
    ): Promise<ExpressResponse> {
        const locals = res.locals as HeaderData;
        const response = await this.studentsService.saveStudent(bodyParams, locals, studentId);
        return res.status(200).json(response);
    }

    /**
     * A method that deletes a student from the database
     * @param id The id of the student
     * @returns A response with success or failure
     */
    @Delete('/api/students/:id')
    async deleteStudent(@Param('id') studentId: number, @Response() res: ExpressResponse): Promise<ExpressResponse> {
        const locals = res.locals as HeaderData;
        const response = await this.studentsService.deleteStudent(studentId, locals);
        return res.status(200).json(response);
    }
}
