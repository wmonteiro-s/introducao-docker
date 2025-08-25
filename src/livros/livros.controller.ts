import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { Livro } from '@prisma/client';

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Post()
  create(@Body() data: CreateLivroDto) {
    return this.livrosService.create(data);
  }

  @Get()
  findAll(): Promise<Livro[]> {
    return this.livrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.livrosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateLivroDto) {
    return this.livrosService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.livrosService.remove(id);
  }
}
