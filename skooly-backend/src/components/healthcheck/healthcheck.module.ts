import { Module } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';
import { LoggerService } from '../../providers/logger.service';

@Module({
    imports: [],
    controllers: [],
    providers: [LoggerService, HealthcheckService],
    exports: [HealthcheckService],
})
export class HealthcheckModule {}
