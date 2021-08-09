import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBooleanString, IsNotEmpty, IsNumberString, IsOptional, IsString, ValidateNested } from 'class-validator';

export class FindAllAssuntoDto {
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
    @ApiProperty({ required: false, description: 'Procura assunto por descrição.' })
    descricao?: string;

    @IsOptional()
    @IsBooleanString()
    @ApiProperty({ required: false, description: 'Procura assunto por ser opcional envio ao usuário ou não.' })
    opcional?: string;
}

class AssuntoDto {
    @ApiProperty({ description: 'Identificador do assunto da notificação.' })
    id: number;

    @ApiProperty({ description: 'Descrição do assunto da notificação.' })
    descricao: string;

    @ApiProperty({ description: 'Define se o usuário pode optar em receber ou não o assunto da notificação.' })
    opcional: boolean;
}

class AssuntosDto {
    @ApiProperty({})
    @ValidateNested()
    @Type(() => AssuntoDto)
    assunto: AssuntoDto;
}

export class FindAllAssuntoResponseDto {
    @ApiProperty({ required: true, description: 'Número da página de paginação.' })
    page: number;

    @ApiProperty({ required: true, description: 'Limite de itens por página.' })
    limit: number;

    @ApiProperty({ required: false, description: 'Define se retorna itens excluídos.' })
    deletedo?: string;

    @ApiProperty({ required: false, description: 'Procura assunto por descrição.' })
    descricao?: string;

    @ApiProperty({ required: false, description: 'Procura assunto por ser opcional envio ao usuário ou não.' })
    opcional?: string;

    @ApiProperty({ required: false, description: 'Assuntos encontrados.' })
    @ValidateNested()
    @Type(() => AssuntosDto)
    assuntos: AssuntosDto[];
}
