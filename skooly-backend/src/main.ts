import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './providers/logger.service';
import { AppConfigService } from './configs/app/config.service';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), {
        logger: new LoggerService(),
    });

    const logger = app.get(LoggerService);
    const appConfig = app.get(AppConfigService);

    app.enableCors();
    app.useLogger(logger);
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(appConfig.port);
    logger.info(`Application is running on port: ${appConfig.port}`);
}

bootstrap();
