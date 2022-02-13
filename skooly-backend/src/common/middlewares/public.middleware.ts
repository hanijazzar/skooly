import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PublicMiddleware implements NestMiddleware {
    constructor() {}

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            // typically we would get the user's auth token and the auth service will check the user's role in the db
            res.locals.role = req.headers['x-user-role'];

            next();
        } catch (e) {
            return res.status(500).json({
                message: e.message,
            });
        }
    }
}
