import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Livro } from '@prisma/client';

@Injectable()
export class LivrosService {
  constructor(private prisma: PrismaService){}

  async create(data: CreateLivroDto): Promise<Livro> {
    return await this.prisma.livro.create({ data })
  }

  async findAll(): Promise<Livro[]> {
    return await this.prisma.livro.findMany()
  }

  async findOne(id: string): Promise<Livro | null> {
    const foundId = await this.prisma.livro.findUnique({
      where: { id }
    })

    if(!foundId) throw new NotFoundException(`Livro com o id:${id} não foi encontrado`)

    return foundId
  }

  async update(id: string, data: UpdateLivroDto): Promise<Livro | null> {
    const foundId = await this.prisma.livro.findUnique({
      where: { id }
    })

    if(!foundId) throw new NotFoundException(`Não foi possível atualizar o livro com o id:${id}`)

    return await this.prisma.livro.update({ where: { id }, data: data })
  }

  async remove(id: string): Promise<Livro | null> {
    const deletedId = await this.prisma.livro.delete({
      where: { id }
    })

    if(!deletedId) throw new NotFoundException(`Não foi possivel deletar o livro com id:${id}`)

    return deletedId
  }
}
