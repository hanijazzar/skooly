import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/providers/logger.service';

@Injectable()
export class HealthcheckService {
    constructor(private logger: LoggerService) {}
}
