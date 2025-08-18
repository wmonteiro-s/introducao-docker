import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateLivroDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    author: string

    @IsString()
    synopsis: string

    @IsNumber()
    year: number
}
