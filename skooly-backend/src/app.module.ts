import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LoggerService } from './providers/logger.service';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppConfigModule } from './configs/app/config.module';
import { DatabaseModule } from './providers/databases/database.module';
import { PublicMiddleware } from './common/middlewares/public.middleware';
import { StudentsModule } from './components/students/students.module';
import { HealthcheckModule } from './components/healthcheck/healthcheck.module';
import { StudentsController } from './components/students/students.controller';
import { HealthcheckController } from './components/healthcheck/healthcheck.controller';

@Module({
    imports: [AppConfigModule, DatabaseModule, HealthcheckModule, StudentsModule],
    controllers: [AppController, HealthcheckController, StudentsController],
    providers: [AppService, LoggerService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(PublicMiddleware).forRoutes('api');
    }
}
