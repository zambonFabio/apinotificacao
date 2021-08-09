import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, ValidationPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../autenticacao/jwt/jwt.guard';
import { DispositivoService } from './dispositivo.service';
import { CreateDispositivoDto, CreateDispositivoResponseDto } from './dto/create-dispositivo.dto';
import { FindAllDispositivoDto, FindAllDispositivoResponseDto } from './dto/find-all-dispositivo.dto';
import { FindOneDispositivoResponseDto } from './dto/find-one-dispositivo.dto';

@ApiTags('Dispositivo')
@Controller('/v1/dispositivo')
export class DispositivoController {
    constructor(private readonly dispositivoService: DispositivoService) {}

    @Post()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: CreateDispositivoResponseDto })
    create(@Request() req, @Body(new ValidationPipe()) createDispositivoDto: CreateDispositivoDto) {
        return this.dispositivoService.create(req.user, createDispositivoDto);
    }

    @Get()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: FindAllDispositivoResponseDto })
    findAll(@Query(new ValidationPipe()) query: FindAllDispositivoDto) {
        return this.dispositivoService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: FindOneDispositivoResponseDto })
    findOne(@Param('id') id: string) {
        return this.dispositivoService.findOne(+id);
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Dispositivo removido com sucesso' })
    remove(@Request() req, @Param('id') id: string) {
        return this.dispositivoService.remove(req.user, +id);
    }
}
