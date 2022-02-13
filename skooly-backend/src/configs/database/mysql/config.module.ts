import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { MysqlConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * Import and provide mysql configuration related classes.
 *
 * @module
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                DB_HOST: Joi.string(),
                DB_PORT: Joi.number(),
                DB_USER: Joi.string(),
                DB_DATABASE: Joi.string(),
                DB_LOGGING: Joi.bool(),
            }),
        }),
    ],
    providers: [ConfigService, MysqlConfigService],
    exports: [ConfigService, MysqlConfigService],
})
export class MysqlConfigModule {}
