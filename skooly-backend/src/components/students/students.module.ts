import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerService } from '../../providers/logger.service';
import { SEQUELIZE_CONNECTIONS } from '../../common/constants';
import { Student } from 'src/models/student.model';
import { StudentFamilyMember } from 'src/models/student-family-member.model';
import { StudentsService } from './students.service';

@Module({
    imports: [SequelizeModule.forFeature([Student, StudentFamilyMember], SEQUELIZE_CONNECTIONS.MAIN)],
    controllers: [],
    providers: [LoggerService, StudentsService],
    exports: [StudentsService],
})
export class StudentsModule {}
