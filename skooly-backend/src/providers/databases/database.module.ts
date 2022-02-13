import { Module } from '@nestjs/common';
import { MysqlDatabaseService } from './mysql.provider';


@Module({
    imports: [MysqlDatabaseService],
    providers: [],
    exports: [MysqlDatabaseService],
})
export class DatabaseModule {}
