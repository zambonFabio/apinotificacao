import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AplicativoModule } from './app/aplicativo/aplicativo.module';
import { Aplicativo } from './app/aplicativo/entities/aplicativo.entity';
import { AutenticacaoModule } from './app/autenticacao/autenticacao.module';
import { DispositivoModule } from './app/dispositivo/dispositivo.module';
import { Dispositivo } from './app/dispositivo/entities/dispositivo.entity';
import { AssuntoModule } from './app/assunto/assunto.module';
import { Assunto } from './app/assunto/entities/assunto.entity';
import { UsuarioModule } from './app/usuario/usuario.module';
import { Usuario } from './app/usuario/entities/usuario.entity';
import { AplicativoAssuntoModule } from './app/aplicativo-assunto/aplicativo-assunto.module';
import { AplicativoAssunto } from './app/aplicativo-assunto/entities/aplicativo-assunto.entity';
import { UsuarioAssuntoModule } from './app/usuario-assunto/usuario-assunto.module';
import { UsuarioAssunto } from './app/usuario-assunto/entities/usuario-assunto.entity';

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
        // DispositivoModule,
        // AssuntoModule,
        // UsuarioModule,
        // AplicativoAssuntoModule,
        // UsuarioAssuntoModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
