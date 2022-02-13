import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentFamilyMember } from 'src/models/student-family-member.model';
import { Student } from 'src/models/student.model';
import { SEQUELIZE_CONNECTIONS } from '../../common/constants';
import { MysqlConfigModule } from '../../configs/database/mysql/config.module';
import { MysqlConfigService } from '../../configs/database/mysql/config.service';

@Module({
    imports: [
        SequelizeModule.forRootAsync({
            imports: [MysqlConfigModule],
            name: SEQUELIZE_CONNECTIONS.MAIN,
            useFactory: async (mysqlConfig: MysqlConfigService) => ({
                dialect: mysqlConfig.dialect,
                host: mysqlConfig.host,
                port: mysqlConfig.port,
                username: mysqlConfig.username,
                password: mysqlConfig.password,
                database: mysqlConfig.database,
                logging: false,
                models: [
                    Student,
                    StudentFamilyMember,
                ],
            }),
            inject: [MysqlConfigService],
        }),
    ],
})
export class MysqlDatabaseService {}
