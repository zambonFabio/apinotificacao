import { Controller, Get, Post, Body, Param, Delete, Query, ValidationPipe, Request, UseGuards, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../autenticacao/jwt/jwt.guard';
import { AplicativoService } from './aplicativo.service';
import { CreateAplicativoDto, CreateAplicativoResponseDto } from './dto/create-aplicativo.dto';
import { FindAllAplicativoDto, FindAllAplicativoResponseDto } from './dto/find-all-aplicativo.dto';
import { FindOneAplicativoResponseDto } from './dto/find-one-aplicativo.dto';
import { UpdateAplicativoDto } from './dto/update-aplicativo.dto';

@ApiTags('Aplicativo')
@Controller('/v1/aplicativo')
export class AplicativoController {
    constructor(private readonly aplicativoService: AplicativoService) {}

    @Post()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: CreateAplicativoResponseDto })
    create(@Request() req, @Body(new ValidationPipe()) createAplicativoDto: CreateAplicativoDto) {
        return this.aplicativoService.create(req.user, createAplicativoDto);
    }

    @Get()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: FindAllAplicativoResponseDto })
    findAll(@Query(new ValidationPipe()) query: FindAllAplicativoDto) {
        return this.aplicativoService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: FindOneAplicativoResponseDto })
    findOne(@Param('id') id: string) {
        return this.aplicativoService.findOne(+id);
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: CreateAplicativoResponseDto })
    update(@Request() req, @Param('id') id: string, @Body() updateAplicativoDto: UpdateAplicativoDto) {
        return this.aplicativoService.update(req.user, +id, updateAplicativoDto);
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Aplicativo removido com sucesso' })
    remove(@Request() req, @Param('id') id: string) {
        return this.aplicativoService.remove(req.user, +id);
    }
}
