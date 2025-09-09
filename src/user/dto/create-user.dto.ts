import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateUserDto {
    @ApiProperty({
        example: 'Wesley Monteiro',
        description: 'Nome completo do usuário'
    })
    @IsNotEmpty({ message: 'O nome é obrigatório!' })
    name: string

    @ApiProperty({
        example: 'wesley@gmail.com',
        description: 'Endereço de email do usuário'
    })
    @IsEmail({}, { message: 'O email deve ser um endereço válido!' })
    email: string
}
