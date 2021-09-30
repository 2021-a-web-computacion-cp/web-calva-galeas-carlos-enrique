import {
    IsEmpty,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
    IsNumber,
    IsPositive, IsDate, IsBoolean, Max,
} from 'class-validator';

export class MusicaCrearDto {
	//Nombre de la canción
    @IsNotEmpty() // No vacio
    @IsString()
    @MinLength(3)
    @MaxLength(70)
    nombre: string;

    //Autor
    @IsNotEmpty() 
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    autor: string;

    //Género
    @IsNotEmpty() 
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    genero: string;

    //Número de reproducciones
    @IsNotEmpty() 
    @IsNumber()
    @IsPositive()
    @Max(10000000000)
    numeroReproducciones: number;
    
	//Fecha de lanzamiento
    @IsNotEmpty()
    @IsDate()
    fechaLanzamiento: Date;

    
    //videoclip
    @IsNotEmpty()
    @IsBoolean()
    videoclip: boolean;
}
