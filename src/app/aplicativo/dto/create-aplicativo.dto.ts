import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAplicativoDto {
    @ApiProperty({ maxLength: 100, description: 'Nome do Aplicativo.' })
    @IsNotEmpty({ message: 'Nome do aplicativo deve ser informado.' })
    nome: string;

    @ApiPropertyOptional({ description: 'Credenciais do Aplicativo no Firebase.' })
    credencialFirebase?: string;
}
