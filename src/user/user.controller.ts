import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  private userService: UserService

  constructor( userService: UserService) {
    this.userService = userService
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários'})
  @ApiResponse({ status: 200, description: 'Lista de Usuários retornada com sucesso' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um usuário por id' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @ApiResponse({ status: 400, description: 'Usuário não encontrado' })
  @ApiParam({ name: 'id', type: String, description: 'ID do usuário' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um usuário' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso '})
  @ApiParam({ name: 'id', type: String, description: 'ID do usuário' })
  @ApiBody({ type: UpdateUserDto })
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um usuário' })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
  @ApiParam({ name: 'id', type: String, description: 'ID do usuário'})
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
