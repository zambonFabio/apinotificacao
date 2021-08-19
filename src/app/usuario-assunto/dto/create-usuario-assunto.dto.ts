import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

class UsuarioDto {
    @ApiProperty({ required: true, description: 'UID do usuário.' })
    @IsNotEmpty({ message: 'UID do usuário deve ser informado.' })
    uid: string;
}

class AssuntoDto {
    @ApiProperty({ required: false, description: 'Id do Assunto a ser vinculado ao usuário.' })
    @IsNotEmpty({ message: 'Id do Assunto a ser vinculado ao usuário deve ser informado.' })
    id: number;
}

class UsuarioAssuntoDto {
    @ApiProperty({ description: 'Assunto relacionado ao usuário.' })
    @ValidateNested()
    @Type(() => AssuntoDto)
    assunto: AssuntoDto;
}

export class CreateUsuarioAssuntoDto {
    @ApiProperty({ required: true })
    @ValidateNested()
    @Type(() => UsuarioDto)
    @IsNotEmpty({ message: 'UID do usuário deve ser informado.' })
    usuario: UsuarioDto;

    @ApiProperty({ required: false, description: 'Assuntos relacionados ao usuário.' })
    @ValidateNested()
    @Type(() => UsuarioAssuntoDto)
    assuntos: UsuarioAssuntoDto[];
}

export class CreateUsuarioAssuntoResponseDto {
    @ApiProperty({ required: true, description: 'UID do usuário do sistema de origem.' })
    uid: string;

    @ApiProperty({ required: false, description: 'Assuntos relacionados ao usuário.' })
    @ValidateNested()
    @Type(() => UsuarioAssuntoDto)
    assuntos: UsuarioAssuntoDto[];
}
