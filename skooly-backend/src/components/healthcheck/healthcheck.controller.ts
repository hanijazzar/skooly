import { Response as ExpressResponse } from 'express';
import { Controller, Get, Response } from '@nestjs/common';

@Controller()
export class HealthcheckController {
    constructor() {}

    @Get('/api/health')
    async getApiHealthcheck(@Response() res: ExpressResponse): Promise<ExpressResponse> {
        return res.status(200).json({
            messages: 'OK',
        });
    }
}
