import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivrosModule } from './livros/livros.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [LivrosModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
