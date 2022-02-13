import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MysqlConfigModule } from './config.module';
import { Dialect } from 'sequelize/types';


/**
 * Service dealing with db configs based operations.
 *
 * @class
 */
@Injectable()
export class MysqlConfigService {
    constructor(private configService: ConfigService) {}

    get dialect(): Dialect {
        return this.configService.get<Dialect>('mysql.dialect');
    }

    get host(): string {
        return this.configService.get<string>('mysql.host');
    }

    get port(): number {
        return this.configService.get<number>('mysql.port');
    }

    get username(): string {
        return this.configService.get<string>('mysql.username');
    }

    get password(): string {
        return this.configService.get<string>('mysql.password');
    }

    get database(): string {
        return this.configService.get<string>('mysql.database');
    }
}
