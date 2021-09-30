import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { MusicaService } from './musica.service';
import { MusicaCrearDto } from './dto/musica-crear.dto';
import { validate } from 'class-validator';
import { Prisma } from '@prisma/client';
import {stringify} from "ts-jest/dist/utils/json";


// http://localhost:3000/musica/......
@Controller('musica')
export class MusicaController {
  constructor(
    // Inyeccion dependencias
    private musicaService: MusicaService,
  ) {}

//Listar Musica
 @Get('lista-musica')
  async listaMusica(@Res() response, @Query() parametrosConsulta) {
    try {
      // validar parametros de consulta con un dto
      const respuesta = await this.musicaService.buscarMuchos({
        skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
        take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
        busqueda: parametrosConsulta.busqueda
          ? parametrosConsulta.busqueda
          : undefined,
      });
      response.render('musica/lista', {
        datos: {
          musica: respuesta,
          mensaje: parametrosConsulta.mensaje,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error del servidor');
    }
  }
  
  // Vista crear
  @Get('vista-crear')
  vistaCrear(@Res() response, @Query() parametrosConsulta) {
    response.render('musica/crear', {
      datos: {
        mensaje: parametrosConsulta.mensaje,
      },
    });
  }
  
//Crear Musica
  @Post('crear-musica-formulario')
  async crearMusicaFormulario(@Res() response, @Body() parametrosCuerpo) {
    
	    const musicaCrearDto = new MusicaCrearDto();
        musicaCrearDto.nombre = parametrosCuerpo.nombre;
        musicaCrearDto.autor = parametrosCuerpo.autor;
		musicaCrearDto.genero = parametrosCuerpo.genero;
		musicaCrearDto.numeroReproducciones = parseInt(parametrosCuerpo.numeroReproducciones);
        musicaCrearDto.fechaLanzamiento = new Date(parametrosCuerpo.fechaLanzamiento);
        musicaCrearDto.videoclip = parametrosCuerpo.videoclip == "true" ? true : false;
		
	try {
	
        const errores = await validate(musicaCrearDto);
            if (errores.length > 0 ) {
                response.redirect(
                    '/musica/vista-crear' +
                    '?mensaje= Ingrese los datos correctamente'
                );
                console.log(JSON,stringify(errores));
                throw new BadRequestException('No envia bien los parametros');

            } else {
                await this.musicaService.crearUno(musicaCrearDto);
                response.redirect(
                    '/musica/vista-crear' +
                    '?mensaje= Se creo la canción ' +
                    parametrosCuerpo.nombre,
                );
            }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creando la canción');
    }
  }



// Actualizar musica

    @Post('actualizar-musica/:idMusica')
    async obtenerUno(@Res() response,  @Param() parametrosRuta) {
        try {
            const respuesta = await this.musicaService.buscarUno(+parametrosRuta.idMusica);
            console.log("-----------------------------")
            console.log(respuesta)
            response.render('musica/actualizar', {
                datos: {
                    musica: respuesta,
                },

            });

        } catch (error) {
            console.error(error)
            throw new InternalServerErrorException('Error')
        }
    }

// Actualizar musica formulario
    @Post('actualizar-musica-formulario/:idMusica')
    async actualizarMusica(@Res() response,@Body() parametrosCuerpo,@Param() parametrosRuta,
    ) {		
	
	    const musicaCrearDto = new MusicaCrearDto();
        musicaCrearDto.nombre = parametrosCuerpo.nombre;
        musicaCrearDto.autor = parametrosCuerpo.autor;
		musicaCrearDto.genero = parametrosCuerpo.genero;
		musicaCrearDto.numeroReproducciones = parseInt(parametrosCuerpo.numeroReproducciones);
        musicaCrearDto.fechaLanzamiento = new Date(parametrosCuerpo.fechaLanzamiento);
        musicaCrearDto.videoclip = parametrosCuerpo.videoclip == "true" ? true : false;
	
        try {
            const errores = await validate(musicaCrearDto);

            if (errores.length > 0) {
                response.redirect(
                    '/musica/lista-musica' +
                    '?mensaje= Ingrese los datos correctamente'
                );
                console.log(JSON,stringify(errores));
                throw new BadRequestException('No envia bien parametros: ');


            } else {
                await this.musicaService.actualizarUno({
                    id: +parametrosRuta.idMusica,
                    data: musicaCrearDto,
                });
                response.redirect(
                    '/musica/lista-musica' +
                    '?mensaje= Se actualizo la canción ' +
                    parametrosCuerpo.nombre,
                );
            }
        } catch (error) {
            throw new InternalServerErrorException('Error actualizando la canción');
        }
    }


// Eliminar musica
  @Post('eliminar-musica/:idMusica')
  async eliminarMusica(@Res() response, @Param() parametrosRuta) {
    try {
      await this.musicaService.eliminarUno(+parametrosRuta.idMusica);
      response.redirect(
	'/musica/lista-musica' + '?mensaje= Se elimino la canción',
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error eliminando la canción');
    }
  }


}