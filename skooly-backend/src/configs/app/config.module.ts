import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { Env, LogLevel } from '../../common/types';
import { AppConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                APP_NAME: Joi.string().default('Skooly'),
                APP_ENV: Joi.string().valid(Env.DEV, Env.PROD, Env.TEST).default(Env.DEV),
                APP_URL: Joi.string().default('http://localhost:9000'),
                APP_PORT: Joi.number().default(9000),
                LOG_LEVEL: Joi.string()
                    .valid(LogLevel.DEBUG, LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO)
                    .default(LogLevel.INFO),
            }),
        }),
    ],
    providers: [ConfigService, AppConfigService],
    exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
