import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

class AplicativoDto {
    @ApiProperty({ required: false, description: 'Id do aplicativo a ser vinculado ao assunto.' })
    @IsNotEmpty({ message: 'Id do aplicativo a ser vinculado ao assunto deve ser informado.' })
    id: number;
}

class AplicativoAssuntoDto {
    @ApiProperty({ description: 'Aplicativo relacionado ao assunto.' })
    @ValidateNested()
    @Type(() => AplicativoDto)
    aplicativo: AplicativoDto;
}

export class CreateAssuntoDto {
    @ApiProperty({ required: true, description: 'Descrição do assunto da notificação.' })
    @IsNotEmpty({ message: 'Descrição do assunto da notificação deve ser informado.' })
    descricao: string;

    @ApiProperty({ required: true, description: 'Define se o usuário pode optar em receber ou não o assunto da notificação.' })
    @IsNotEmpty({ message: 'Define se o usuário pode optar em receber ou não o assunto da notificação.' })
    opcional: boolean;

    @ApiProperty({ required: false, description: 'Aplicativos relacionados ao Assunto.' })
    @ValidateNested()
    @Type(() => AplicativoAssuntoDto)
    aplicativos: AplicativoAssuntoDto[];
}

export class CreateAssuntoResponseDto {
    @ApiProperty({ description: 'Identificador do assunto da notificação.' })
    id: number;

    @ApiProperty({ description: 'Descrição do assunto da notificação.' })
    descricao: string;

    @ApiProperty({ description: 'Define se o usuário pode optar em receber ou não o assunto da notificação.' })
    opcional: boolean;
}
