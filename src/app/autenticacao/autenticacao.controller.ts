import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { CreateAutenticacaoDto } from './dto/create-autenticacao.dto';
import { UpdateAutenticacaoDto } from './dto/update-autenticacao.dto';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post()
  create(@Body() createAutenticacaoDto: CreateAutenticacaoDto) {
    return this.autenticacaoService.create(createAutenticacaoDto);
  }

  @Get()
  findAll() {
    return this.autenticacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.autenticacaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAutenticacaoDto: UpdateAutenticacaoDto) {
    return this.autenticacaoService.update(+id, updateAutenticacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.autenticacaoService.remove(+id);
  }
}
