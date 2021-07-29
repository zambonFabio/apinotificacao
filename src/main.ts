import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');

    // app.useGlobalPipes(
    //     new ValidationPipe({
    //         exceptionFactory: (errors: ValidationError[]) => new ValidationException(errors),
    //     }),
    // );

    app.use((req: Request, res, next) => {
        res.header('x-powered-by', 'apinotificacao');
        if (req.url === '/') {
            return res.status(200).json({ message: 'API de Notificação.', status: 'online' });
        }
        next();
    });

    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'homolog') {
        const options = new DocumentBuilder().addBearerAuth().setTitle('Documentação da API de Notificação').setVersion('0.1.0').build();
        const document = SwaggerModule.createDocument(app, options);

        SwaggerModule.setup('api', app, document);
    }

    await app.listen(process.env.PORT);
}
bootstrap();
