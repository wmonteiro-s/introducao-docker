import { Test, TestingModule } from "@nestjs/testing"
import { LivrosController } from "./livros.controller"
import { LivrosService } from "./livros.service"
import { CreateLivroDto } from "./dto/create-livro.dto"
import { Livro } from "@prisma/client"
import { UpdateLivroDto } from "./dto/update-livro.dto"


const mockLivrosService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
}

describe('LivrosController', () => {
    let controller: LivrosController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LivrosController],
            providers: [
                { provide: LivrosService, useValue: mockLivrosService }
            ],
        }).compile()

        controller = module.get<LivrosController>(LivrosController)
    })

    it('deve criar um livro', async () => {
        const dto: CreateLivroDto = {
            title: 'Bíblia',
            author: 'Deus',
            synopsis: 'Massa dms',
            year: -1500,
        }

        mockLivrosService.create.mockResolvedValue({ id: 'hash', createdAt: new Date(), ...dto })

        expect(await controller.create(dto)).toEqual(
            expect.objectContaining({
                id: 'hash',
                createdAt: expect.any(Date),
                ...dto,
            })
        )

    })

    it('deve listar todos os livros', async () => {
        const livros: Livro[] = [
            {
                id: 'feveiygb',
                title: 'Bíblia',
                author: 'Deus',
                synopsis: 'Massa dms',
                year: -1500,
                createdAt: new Date(),
            },
            {
                id: 'buwdbdsk',
                title: 'A Metamorfose',
                author: 'Franz Kafka',
                synopsis: 'Massa dms',
                year: 1915,
                createdAt: new Date(),
            },
            {
                id: 'lajisduh',
                title: '1984',
                author: 'George Orwell',
                synopsis: 'Massa dms',
                year: 1949,
                createdAt: new Date(),
            },
        ]

        mockLivrosService.findAll.mockResolvedValue(livros)

        expect( await controller.findAll()).toEqual(livros)
    })

    it('deve mostrar um livro específico', async () => {
        const livros: Livro[] = [
            {
                id: 'feveiygb',
                title: 'Bíblia',
                author: 'Deus',
                synopsis: 'Massa dms',
                year: -1500,
                createdAt: new Date(),
            },
            {
                id: 'buwdbdsk',
                title: 'A Metamorfose',
                author: 'Franz Kafka',
                synopsis: 'Massa dms',
                year: 1915,
                createdAt: new Date(),
            },
            {
                id: 'lajisduh',
                title: '1984',
                author: 'George Orwell',
                synopsis: 'Massa dms',
                year: 1949,
                createdAt: new Date(),
            },
        ]

        mockLivrosService.findOne.mockResolvedValue(livros[2].id)

        const id = 'lajisduh'

        expect( await controller.findOne(id)).toEqual(livros[2].id)
    })

    it('deve atualizar um livro específico', async () => {

        const id = 'buwdbdsk'
        const updatedDto: UpdateLivroDto = {
            title: 'Carta ao Pai',
            synopsis: 'Massa dms',
            year: 1919, 
        } 

        const updatedLivro = {
            id,
            ...updatedDto,
            createdAt: new Date(),
        }
        
        mockLivrosService.update.mockResolvedValue(updatedLivro)


        expect( await controller.update(id, updatedDto) ).toEqual(updatedLivro)
        expect(mockLivrosService.update).toHaveBeenCalledWith(id, updatedDto)
    })

    it('deve excluir um livro específico', async () => {
        const deletedLivro: Livro = {
            id: 'lajisduh',
            title: '1984',
            author: 'George Orwell',
            synopsis: 'Massa dms',
            year: 1949,
            createdAt: new Date(),
        }

        mockLivrosService.remove.mockResolvedValue(deletedLivro.id)
        expect(await controller.delete(deletedLivro.id)).toBe(deletedLivro.id)
        expect(mockLivrosService.remove).toHaveBeenCalledWith(deletedLivro.id)
    })
})