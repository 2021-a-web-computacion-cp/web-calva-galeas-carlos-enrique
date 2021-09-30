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
import { UsuarioService } from './usuario.service';
import { UsuarioCrearDto } from './dto/usuario-crear.dto';
import { Prisma } from '@prisma/client';
import { validate } from 'class-validator';
import {stringify} from "ts-jest/dist/utils/json";

// http://localhost:3000/usuario/......
@Controller('usuario')
export class UsuarioController {
  constructor(
    // Inyeccion dependencias
    private usuarioService: UsuarioService,
  ) {}

  @Post('eliminar-usuario/:idUsuario')
  async eliminarUsuario(@Res() response, @Param() parametrosRuta) {
    try {
      await this.usuarioService.eliminarUno(+parametrosRuta.idUsuario);
      response.redirect(
        '/usuario/lista-usuarios' + '?mensaje=Se elimino al usuario',
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error');
    }
  }

  @Post('crear-usuario-formulario')
  async crearUsuarioFormulario(@Res() response, @Body() parametrosCuerpo) {
    try {
      const respuestaUsuario = await this.usuarioService.crearUno({
        nombre: parametrosCuerpo.nombre,
        apellido: parametrosCuerpo.apellido,
      });
      response.redirect(
        '/usuario/vista-crear' +
          '?mensaje=Se creo el usuario ' +
          parametrosCuerpo.nombre,
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creando usuario');
    }
  }

  @Get('vista-crear')
  vistaCrear(@Res() response, @Query() parametrosConsulta) {
    response.render('usuario/crear', {
      datos: {
        mensaje: parametrosConsulta.mensaje,
      },
    });
  }

  @Get('inicio')
  inicio(@Res() response) {
    response.render('inicio');
  }

  @Get('lista-usuarios')
  async listaUsuarios(@Res() response, @Query() parametrosConsulta) {
    try {
      // validar parametros de consulta con un dto
      const respuesta = await this.usuarioService.buscarMuchos({
        skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
        take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
        busqueda: parametrosConsulta.busqueda
          ? parametrosConsulta.busqueda
          : undefined,
      });
      response.render('usuario/lista', {
        datos: {
          usuarios: respuesta,
          mensaje: parametrosConsulta.mensaje,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error del servidor');
    } 
  }

  @Get(':idUsuario')
  obtenerUno(@Param() parametrosRuta) {
    /*
    this.usuarioService.crearUno({
      apellido: '...',
      fechaCreacion: new Date(),
      nombre: '...',
    });
    this.usuarioService.actualizarUno({
      id: 1,
      data: {
        nombre: '...',
        // fechaCreacion: '...',
        // fechaCreacion: new Date(),
      },
    });
    this.usuarioService.eliminarUno(1);
    */
    return this.usuarioService.buscarUno(+parametrosRuta.idUsuario);
  }

  @Post()
  async crearUno(@Body() parametrosCuerpo) {
    const usuarioCrearDto = new UsuarioCrearDto();
    usuarioCrearDto.nombre = parametrosCuerpo.nombre;
    usuarioCrearDto.apellido = parametrosCuerpo.apellido;
    usuarioCrearDto.fechaCreacion = parametrosCuerpo.fechaCreacion;
    try {
      const errores = await validate(usuarioCrearDto);
      if (errores.length > 0) {
        console.log(JSON.stringify(errores));
        throw new BadRequestException('No envia bien parametros');
      } else {
        return this.usuarioService.crearUno(usuarioCrearDto);
      }
    } catch (error) {
      console.error({ error: error, mensaje: 'Errores en crear usuario' });
      throw new InternalServerErrorException('Error servidor');
    }
  }
}
