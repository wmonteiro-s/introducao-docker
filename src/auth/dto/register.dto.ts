import { ApiProperty } from "@nestjs/swagger"
import { IsString, MinLength } from "class-validator"


export class RegisterDto {
    @ApiProperty({
        description: 'Nome de Usuário',
        example: 'Wesley Monteiro'
    })
    @IsString()
    name: string

    @ApiProperty({
        description: 'Endereço de email',
        example: 'wesley@gmail.com'
    })
    @IsString()
    email: string


    @ApiProperty({
        description: 'Senha de Usuário',
        minLength: 6,
        example: 'ybduud'
    })
    @IsString()
    @MinLength(6)
    password: string

}