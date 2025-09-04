import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

const mockUserServices = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
}


describe("User Controller Tests", () => {

    let controller: UserController;
    
    beforeEach( async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {provide: UserService, useValue: mockUserServices},
            ],
        }).compile()

        controller = module.get<UserController>(UserController)
    });

    it('deve criar listar todos os usuario', async () => {
        const users = [
            {name: "Jonas", email: "jonas@gmail.com"},
            {name: "Joao", email: "joao@gmail.com"}
        ]
        mockUserServices.findAll.mockResolvedValue(users)

        expect(await controller.findAll()).toEqual(users)

    })

     it('deve mostrar um usuário específico', async () => {
        const users = [
            { id: '1', name: 'Wesley', email: 'wesley@gmail.com'},
            { id: '2', name: 'Marcos', email: 'marcos@gmail.com'},
            { id: '3', name: 'Felipe', email: 'felipe@gmail.com'},
        ]
        mockUserServices.findOne.mockResolvedValue(users[0])

        expect(await controller.findOne(users[0].id)).toEqual(users[0])
    })

    it('deve atualizar um usuário', async () => {
        const users = [
            { id: '1', name: 'Wesley', email: 'wesley@gmail.com'},
            { id: '2', name: 'Marcos', email: 'marcos@gmail.com'},
            { id: '3', name: 'Felipe', email: 'felipe@gmail.com'},
        ]

        const updatedUser = { name: 'Brendo', email: 'brendo@gmail.com'}

        mockUserServices.update.mockResolvedValue(updatedUser)

        expect(await controller.update(users[2].id, updatedUser)).toEqual(updatedUser)
    })

    it('deve deletar um usuário específico', async () => {
        const users = [
            { id: '1', name: 'Wesley', email: 'wesley@gmail.com'},
            { id: '2', name: 'Marcos', email: 'marcos@gmail.com'},
            { id: '3', name: 'Felipe', email: 'felipe@gmail.com'},
        ]

        mockUserServices.remove.mockResolvedValue(users[1])

        expect(await controller.remove(users[1].id)).toEqual(users[1])
    
    })
    

})