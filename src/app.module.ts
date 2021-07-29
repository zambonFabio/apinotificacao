import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AplicativoModule } from './app/aplicativo/aplicativo.module';
import { Aplicativo } from './app/aplicativo/entities/aplicativo.entity';
import { AutenticacaoModule } from './app/autenticacao/autenticacao.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: process.env.NODE_ENV == 'production',
        }),
        TypeOrmModule.forRoot({
            type: 'oracle',
            host: process.env.TYPEORM_HOST,
            port: parseInt(process.env.TYPEORM_PORT),
            sid: process.env.TYPEORM_SID,
            schema: process.env.TYPEORM_SCHEMA,
            username: process.env.TYPEORM_USERNAME,
            password: process.env.TYPEORM_PASSWORD,
            entities: [Aplicativo],
            synchronize: false,
            logging: true,
        }),
        AplicativoModule,
        AutenticacaoModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
