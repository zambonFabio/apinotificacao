import { Controller, Get, Post, Body, Param, Delete, Query, Request, UseGuards, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../autenticacao/jwt/jwt.guard';
import { AplicativoService } from './aplicativo.service';
import { CreateAplicativoDto } from './dto/create-aplicativo.dto';
import { FindAllAplicativoDto } from './dto/find-all-aplicativo.dto';
import { UpdateAplicativoDto } from './dto/update-aplicativo.dto';
import { CreateAplicativoSwagger } from './swagger/create-aplicativo.swagger';
import { FindAllAplicativoSwagger } from './swagger/find-all-aplicativo.swagger';
import { FindOneAplicativoSwagger } from './swagger/find-one-aplicativo.swagger';
import { UpdateAplicativoSwagger } from './swagger/update-aplicativo.swagger copy';

@ApiTags('Aplicativo')
@Controller('/v1/aplicativo')
export class AplicativoController {
    constructor(private readonly aplicativoService: AplicativoService) {}

    @Post()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Cadastrar um Aplicativo' })
    @ApiResponse({ status: 201, description: 'Aplicativo cadastrado com sucesso', type: CreateAplicativoSwagger })
    @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
    create(@Request() req, @Body() createAplicativoDto: CreateAplicativoDto) {
        return this.aplicativoService.create(req.user, createAplicativoDto);
    }

    @Get()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Listar Aplicativos' })
    @ApiResponse({ status: 200, description: 'Lista de Aplicativos', type: FindAllAplicativoSwagger })
    findAll(@Query() query: FindAllAplicativoDto) {
        return this.aplicativoService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Encontrar um Aplicativo' })
    @ApiResponse({ status: 200, description: 'Aplicativo encontrado', type: FindOneAplicativoSwagger })
    @ApiResponse({ status: 404, description: 'Aplicativo não encontrado' })
    findOne(@Param('id') id: string) {
        return this.aplicativoService.findOne(id);
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Alterar um Aplicativo' })
    @ApiResponse({ status: 200, description: 'Aplicativo alterado', type: UpdateAplicativoSwagger })
    @ApiResponse({ status: 404, description: 'Aplicativo não encontrado' })
    update(@Request() req, @Param('id') id: string, @Body() updateAplicativoDto: UpdateAplicativoDto) {
        return this.aplicativoService.update(req.user, id, updateAplicativoDto);
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Remover um Aplicativo' })
    @ApiResponse({ status: 204, description: 'Aplicativo removido' })
    @ApiResponse({ status: 404, description: 'Aplicativo não encontrado' })
    remove(@Request() req, @Param('id') id: string) {
        return this.aplicativoService.remove(req.user, id);
    }
}
