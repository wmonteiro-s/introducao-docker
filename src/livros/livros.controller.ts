import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { Livro } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { CommonGuard } from 'src/auth/common.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Cadastrar um livro'})
  @ApiCreatedResponse({ description: 'Livro criado com sucesso' })
  @ApiBody({ type: CreateLivroDto })
  create(@Body() data: CreateLivroDto) {
    return this.livrosService.create(data);
  }

  @Get()
  @UseGuards(CommonGuard)
  @ApiOperation({ summary: 'Listar todos os livros'})
  @ApiResponse({ status: 200, description: 'Lista de Livros retornada com sucesso' })
  findAll(): Promise<Livro[]> {
    return this.livrosService.findAll();
  }

  @Get(':id')
  @UseGuards(CommonGuard)
  @ApiOperation({ summary: 'Buscar um livro por id' })
  @ApiResponse({ status: 200, description: 'Livro encontrado' })
  @ApiResponse({ status: 400, description: 'Livro não encontrado' })
  @ApiParam({ name: 'id', type: String, description: 'ID do usuário' })
  findOne(@Param('id') id: string) {
    return this.livrosService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Atualizar um livro' })
  @ApiResponse({ status: 200, description: 'Livro atualizado com sucesso '})
  @ApiParam({ name: 'id', type: String, description: 'ID do livro' })
  @ApiBody({ type: UpdateLivroDto })
  update(@Param('id') id: string, @Body() data: UpdateLivroDto) {
    return this.livrosService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Deletar um livro' })
  @ApiResponse({ status: 200, description: 'Livro removido com sucesso' })
  @ApiParam({ name: 'id', type: String, description: 'ID do livro'})
  delete(@Param('id') id: string) {
    return this.livrosService.remove(id);
  }
}
