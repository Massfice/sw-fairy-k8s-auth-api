import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    //http://localhost:3500/v1.0/invoke/auth-api/method/docs
    const config = new DocumentBuilder()
        .setTitle('Auth API')
        .setDescription('Auth API for working with Auth0')
        .setVersion('1.0')
        .addTag('Auth')
        .addServer('http://localhost:3002')
        .addServer('https://shinobi-war-fairy.online/v1.0/invoke/auth-api/method')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('/docs', app, document, { customSiteTitle: 'SW Fairy - Auth API' });

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(3002);
}
bootstrap();
