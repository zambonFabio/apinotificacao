import { Controller, Get, Post, Body, Param, Delete, Query, ValidationPipe, Request, UseGuards, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../autenticacao/jwt/jwt.guard';
import { AplicativoService } from './aplicativo.service';
import { CreateAplicativoDto } from './dto/create-aplicativo.dto';
import { FindAllAplicativoDto } from './dto/find-all-aplicativo.dto';
import { UpdateAplicativoDto } from './dto/update-aplicativo.dto';

@ApiTags('Aplicativo')
@Controller('/v1/aplicativo')
export class AplicativoController {
    constructor(private readonly aplicativoService: AplicativoService) {}

    @Post()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    create(@Request() req, @Body(new ValidationPipe()) createAplicativoDto: CreateAplicativoDto) {
        return this.aplicativoService.create(req.user, createAplicativoDto);
    }

    @Get()
    @ApiOkResponse()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    findAll(@Query(new ValidationPipe()) query: FindAllAplicativoDto) {
        return this.aplicativoService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    findOne(@Param('id') id: string) {
        return this.aplicativoService.findOne(+id);
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    update(@Request() req, @Param('id') id: string, @Body() updateAplicativoDto: UpdateAplicativoDto) {
        return this.aplicativoService.update(req.user, +id, updateAplicativoDto);
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    remove(@Request() req, @Param('id') id: string) {
        return this.aplicativoService.remove(req.user, +id);
    }
}
