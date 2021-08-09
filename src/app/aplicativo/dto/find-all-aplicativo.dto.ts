import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBooleanString, IsNotEmpty, IsNumberString, IsOptional, IsString, ValidateNested } from 'class-validator';

export class FindAllAplicativoDto {
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
    @ApiProperty({ required: false, description: 'Procura o Aplicativo pelo nome.' })
    nome?: string;
}

class AplicativoDto {
    @ApiProperty({ required: true, description: 'Identificador do Aplicativo.' })
    id: number;

    @ApiProperty({ required: true, description: 'Nome do Aplicativo.' })
    nome: string;

    @ApiProperty({ required: false, description: 'Credenciais do Aplicativo no Firebase.' })
    credencialFirebase?: string;
}

class AplicativosDto {
    @ApiProperty({})
    @ValidateNested()
    @Type(() => AplicativoDto)
    aplicativo: AplicativoDto;
}

export class FindAllAplicativoResponseDto {
    @ApiProperty({ required: true, description: 'Número da página de paginação.' })
    page: number;

    @ApiProperty({ required: true, description: 'Limite de itens por página.' })
    limit: number;

    @ApiProperty({ required: false, description: 'Define se retorna itens excluídos.' })
    deletedo?: string;

    @ApiProperty({ required: false, description: 'Procura o Aplicativo pelo nome.' })
    nome: string;

    @ApiProperty({ required: false, description: 'Aplicativos encontrados.' })
    @ValidateNested()
    @Type(() => AplicativosDto)
    aplicativos: AplicativosDto[];
}
