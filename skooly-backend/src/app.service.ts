import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getStartApp(): string {
        return 'App is running!';
    }
}
