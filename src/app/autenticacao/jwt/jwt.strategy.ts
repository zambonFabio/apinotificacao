import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUsuarioAutenticado } from 'src/@types/Autenticacao';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY_TOKEN,
        });
    }

    async validate(payload: any): Promise<IUsuarioAutenticado> {
        const { tipoMatricula, codigoMatricula } = payload;
        if (!tipoMatricula || !codigoMatricula) {
            throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
        }

        return {
            tipoMatricula,
            codigoMatricula,
        };
    }
}
