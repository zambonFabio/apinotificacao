import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
    controllers: [AutenticacaoController],
    providers: [AutenticacaoService, JwtStrategy],
})
export class AutenticacaoModule {}
