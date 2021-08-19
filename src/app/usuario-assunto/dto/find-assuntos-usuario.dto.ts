import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBooleanString, IsNotEmpty, IsNumberString, IsOptional, IsString, ValidateNested } from 'class-validator';

export class FindAssuntosUsuarioDto {
    @IsNotEmpty({ message: 'Aplicativo é obrigatório!' })
    @IsNumberString()
    @ApiProperty({ required: true, description: 'Identificador do Aplicativo.' })
    aplicativoId: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true, description: 'Identificador do usuário.' })
    uid: string;
}

class AssuntoUsuarioDto {
    @ApiProperty({ description: 'Identificador do assunto.' })
    id: number;

    @ApiProperty({ description: 'Descrição do assunto.' })
    descricao: string;

    @ApiProperty({ description: 'Define se usuário autoriza ou não o envio de notificações referente ao assunto.' })
    autorizado: boolean;
}

export class FindAssuntosUsuarioResponseDto {
    @ApiProperty({ description: 'Assuntos de notificações autorizados ou não a serem enviados para o usuário.' })
    assuntos: AssuntoUsuarioDto[];
}
