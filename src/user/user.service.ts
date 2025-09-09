import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User | null> {
    const foundedUser = await this.prisma.user.findUnique({ where: { id } })
    if(!foundedUser) throw new NotFoundException(`Usuário com id: ${id}, não foi encontrado.`)

    return foundedUser
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
    const foundedId = await this.prisma.user.findUnique({ where: { id } })
    if(!foundedId) throw new NotFoundException(`Usuário com id: ${id}, não foi encontrado`)

    return await this.prisma.user.update({ where: { id }, data})
  }

  async remove(id: string): Promise<User | null> {
    try {
      return await this.prisma.user.delete({ where: { id }})
    } catch (error) {
      throw new NotFoundException(`Usuário com id: ${id}, não foi encontrado`)
    }
  }

}