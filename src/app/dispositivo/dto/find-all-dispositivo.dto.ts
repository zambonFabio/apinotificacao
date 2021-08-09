import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBooleanString, IsNotEmpty, IsNumberString, IsOptional, IsString, ValidateNested } from 'class-validator';

export class FindAllDispositivoDto {
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
    @ApiProperty({ required: false, description: 'Procura dispositivo pelo codigo.' })
    codigo?: string;
}

class DispositivoDto {
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

class DispositivosDto {
    @ApiProperty({})
    @ValidateNested()
    @Type(() => DispositivoDto)
    dispositivo: DispositivoDto;
}

export class FindAllDispositivoResponseDto {
    @ApiProperty({ required: true, description: 'Número da página de paginação.' })
    page: number;

    @ApiProperty({ required: true, description: 'Limite de itens por página.' })
    limit: number;

    @ApiProperty({ required: false, description: 'Define se retorna itens excluídos.' })
    deletedo?: string;

    @ApiProperty({ required: false, description: 'Procura o Dispositivo pelo codigo.' })
    codigo: string;

    @ApiProperty({ required: false, description: 'Dispositivos encontrados.' })
    @ValidateNested()
    @Type(() => DispositivosDto)
    dispositivos: DispositivosDto[];
}
