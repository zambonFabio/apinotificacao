import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

class AplicativoDto {
    @ApiProperty({ required: true, description: 'Id do Aplicativo.' })
    @IsNotEmpty({ message: 'Id do aplicativo deve ser informado.' })
    id: number;
}

class UsuarioDto {
    @ApiProperty({ required: true, description: 'UID do usuário.' })
    @IsNotEmpty({ message: 'UID do usuário deve ser informado.' })
    uid: string;
}

export class CreateDispositivoDto {
    @ApiProperty({ required: true })
    @ValidateNested()
    @Type(() => AplicativoDto)
    @IsNotEmpty({ message: 'Aplicativo deve ser informado.' })
    aplicativo: AplicativoDto;

    @ApiProperty({ required: true })
    @ValidateNested()
    @Type(() => UsuarioDto)
    @IsNotEmpty({ message: 'UID do usuário deve ser informado.' })
    usuario: UsuarioDto;

    @ApiProperty({ required: true, description: 'Código do dispositivo.' })
    @IsNotEmpty({ message: 'Código do dispositivo deve ser informado.' })
    codigo: string;

    @ApiProperty({ required: false, description: 'Token do dispositivo gerado pelo Firebase.' })
    tokenFirebase?: string;
}

export class CreateDispositivoResponseDto {
    @ApiProperty({ required: true, description: 'Id do Dispositivo.' })
    id: number;

    @ApiProperty({ required: true, description: 'Id do Aplicativo.' })
    aplicativoId: number;

    @ApiProperty({ required: true, description: 'Id do Usuario.' })
    usuarioId: number;

    @ApiProperty({ required: true, description: 'Código do dispositivo.' })
    codigo: string;

    @ApiProperty({ required: false, description: 'Token do dispositivo gerado pelo Firebase.' })
    tokenFirebase?: string;
}
