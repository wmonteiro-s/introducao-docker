import { Test, TestingModule } from "@nestjs/testing"
import { LivrosService } from "./livros.service"
import { PrismaService } from "../prisma/prisma.service"
import { CreateLivroDto } from "./dto/create-livro.dto"
import { Livro } from "@prisma/client"
import { UpdateLivroDto } from "./dto/update-livro.dto"


const mockPrismaService = {
    livro: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
}

describe('LivrosService', () => {
    let service: LivrosService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LivrosService,
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile()

        service = module.get<LivrosService>(LivrosService)
    })

    it('deve criar livro', async () => {
        const dto: CreateLivroDto = {
            title: 'A Divina Comédia',
            author: 'Dante Alighieri',
            synopsis: 'Massa dms',
            year: ~1321,
        }

        const book: Livro = {
            id: Math.random().toString(36).substring(2, 15)
                + Math.random().toString(36).substring(2, 15),
            ...dto,
            createdAt: new Date(),
        }

        mockPrismaService.livro.create.mockResolvedValue(book)

        expect(await service.create(dto)).toEqual(book)
        expect(mockPrismaService.livro.create).toHaveBeenCalledWith({ data: dto })

    })

    it('deve listar todos os livros', async () => {
        const books: Livro[] = [
            {
                id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                title: 'A Divina Comédia',
                author: 'Dante Alighieri',
                synopsis: 'Massa dms',
                year: ~1321,
                createdAt: new Date(),
            },
            {
                id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                title: 'Dom Casmurro',
                author: 'Machado de Assis',
                synopsis: 'Massa dms',
                year: 1900,
                createdAt: new Date(),
            },
        ]

        mockPrismaService.livro.findMany.mockResolvedValue(books)

        expect(await service.findAll()).toEqual(books)
        expect(mockPrismaService.livro.findMany).toHaveBeenCalled()
    })

    it('deve mostrar um livro específico', async () => {
        const book: Livro = {
            id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            title: 'Dom Casmurro',
            author: 'Machado de Assis',
            synopsis: 'Massa dms',
            year: 1900,
            createdAt: new Date(),
        }

        mockPrismaService.livro.findUnique.mockResolvedValue(book.id)

        expect( await service.findOne(book.id) ).toEqual(book.id)
        expect( mockPrismaService.livro.findUnique ).toHaveBeenCalled()
    })

    it('deve atualizar um livro pelo id', async () => {
        
        const updatedBookDto: UpdateLivroDto = {
            title: 'A República',
            author: 'Platão',
            synopsis: 'Massa dms atualizado',
            year: ~-380,
        }
        
        const updatedBook: Livro = {
            id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            title: 'A República',
            author: 'Platão',
            synopsis: 'Massa dms atualizado',
            year: ~-380,
            createdAt: new Date()
        }

        mockPrismaService.livro.update.mockResolvedValue(updatedBook)

        expect( await service.update(
            updatedBook.id,
            updatedBookDto
        )).toEqual(updatedBook)

        expect( mockPrismaService.livro.update )
        .toHaveBeenCalledWith({
            data: updatedBookDto,
            where: {id: updatedBook.id} 
        })
    })

    it('deve deletar um livro pelo id', async () => {
        const book: Livro = {
            id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            title: 'A Revoluçao dos bichos',
            author: 'George Orwell',
            synopsis: 'Massa dms',
            year: 1945,
            createdAt: new Date()
        }

        mockPrismaService.livro.delete.mockResolvedValue(book)

        expect( await service.remove(book.id) ).toEqual(book)
        expect( mockPrismaService.livro.delete ).toHaveBeenCalledWith({
            where: { id: book.id }
        })
    })

})