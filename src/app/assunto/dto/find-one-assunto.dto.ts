import { ApiProperty } from '@nestjs/swagger';

export class FindOneAssuntoResponseDto {
    @ApiProperty({ description: 'Identificador do assunto da notificação.' })
    id: number;

    @ApiProperty({ description: 'Descrição do assunto da notificação.' })
    descricao: string;

    @ApiProperty({ description: 'Define se o usuário pode optar em receber ou não o assunto da notificação.' })
    opcional: boolean;
}
