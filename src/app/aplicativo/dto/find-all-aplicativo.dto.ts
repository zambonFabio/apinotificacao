import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class FindAllAplicativoDto {
    @IsNotEmpty({
        message: 'Page é obrigatório!',
    })
    @IsNumberString()
    @ApiProperty({ required: true, description: 'Número da página de paginação.' })
    page: number;

    @IsOptional()
    @IsNumberString()
    // @Max(50)
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
