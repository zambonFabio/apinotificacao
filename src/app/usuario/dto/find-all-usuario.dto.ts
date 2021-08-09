import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBooleanString, IsNotEmpty, IsNumberString, IsOptional, IsString, ValidateNested } from 'class-validator';

export class FindAllUsuarioDto {
    @IsNotEmpty({
        message: 'Page é obrigatório!',
    })
    @IsNumberString()
    @ApiProperty({ required: true, description: 'Número da página de paginação.' })
    page: number;

    @IsOptional()
    @IsNumberString()
    @ApiProperty({ required: true, description: 'Limite de itens por página.' })
    limit: number;

    @IsOptional()
    @IsBooleanString()
    @ApiProperty({ required: false, description: 'Define se retorna itens excluídos.' })
    deletedo?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, description: 'Procura o usuário pelo uid.' })
    uid?: string;
}

class UsuarioDto {
    @ApiProperty({ required: true, description: 'Identificador do usuário.' })
    id: string;

    @ApiProperty({ required: true, description: 'UID do usuário do sistema de origem.' })
    uid: string;
}

class UsuariosDto {
    @ApiProperty({})
    @ValidateNested()
    @Type(() => UsuarioDto)
    usuario: UsuarioDto;
}

export class FindAllUsuarioResponseDto {
    @ApiProperty({ required: true, description: 'Número da página de paginação.' })
    page: number;

    @ApiProperty({ required: true, description: 'Limite de itens por página.' })
    limit: number;

    @ApiProperty({ required: false, description: 'Define se retorna itens excluídos.' })
    deletedo?: string;

    @ApiProperty({ required: false, description: 'Procura o usuário pelo uid.' })
    uid: string;

    @ApiProperty({ required: false, description: 'Usuário encontrados.' })
    @ValidateNested()
    @Type(() => UsuariosDto)
    usuarios: UsuariosDto[];
}
