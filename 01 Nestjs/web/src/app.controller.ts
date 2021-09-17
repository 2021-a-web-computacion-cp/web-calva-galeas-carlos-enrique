import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HttpCode,
  InternalServerErrorException,
  Param,
  Put,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { response } from "express";

// npm i cookie-parser express-session session-file-store

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  @HttpCode(200)
  getHello(): string {
    return this.appService.getHello();
  }

  // import {Controller, Get, HttpCode} from '@nestjs/common';
  @Get('texto')
  @HttpCode(200)
  holaTexto(): string {
    return 'HOLA TEXTO';
  }

  @Get('html')
  @HttpCode(201)
  holaHTML(): string {
    return '<h1>Hola HTML</h1> <button>Click</button>';
  }

  @Get('json')
  @HttpCode(200)
  holaJSON(): string {
    return '{mensaje: "Hola json" }';
  }

  @Get('bad-request')
  badRequest() {
    throw new BadRequestException();
  }

  @Get('internal-error')
  internalError() {
    throw new InternalServerErrorException();
  }

  @Get('setear-cookie-insegura')
  setearCookieInsegura(
    @Req() req, //  request - PETICION
    @Res() res, //  response - RESPUESTA
  ) {
    res.cookie(
      'galletaInsegura', // nombre
      'Tengo hambre', // valor
    );
    res.cookie(
      'galletaSeguraYFirmada', // nombre
      'Web :3', // valor
      {
        secure: true, // solo se transfiera por canales confiables https
        signed: true, // Encriptacion
      },
    );
    res.send('ok'); // return de antes
  }

  @Get('mostrar-cookies')
  mostrarCookies(@Req() req) {
    const mensaje = {
      sinFirmar: req.cookies,
      firmadas: req.signedCookies,
    };
    // req.signedCookies.total
    return mensaje;
  }

  @Get('parametros-consulta/:nombre/:apellido')
  @HttpCode(200)
  @Header('Cache-Control', 'none') // Cabeceras de respuesta (response headers)
  @Header('EPN', 'SISTEMAS') // Cabeceras de respuesta (response headers)
  parametrosConsulta(
    @Query() queryParams,
    @Param() params,
  ) {
    return {
      parametrosConsulta: queryParams,
      parametrosRuta: params,
    };
  }

  @Post('parametros-cuerpo') // 201
  @HttpCode(200)
  parametrosCuerpo(
    @Body() bodyParams,
    @Headers() cabecerasPeticion,
  ) {
    return {
      parametrosCuerpo: bodyParams,
      cabeceras: cabecerasPeticion,
    };
  }
  
  // Calculadora

  // Suma
  
  @Get('suma')
  @HttpCode(200)
  suma(
      @Query() ParametroConsulta, @Req() request, @Res({passthrough: true}) response,
  ){
    var resultado = Number(ParametroConsulta.numero1) + Number(ParametroConsulta.numero2);
    var total= request.signedCookies["total"];
    if( total == undefined) {
      response.cookie('total', 100, { signed: true, },);
      response.send('El valor de la cookie es 100');
    }else {
      var total1 = Number(total) - resultado;
      response.cookie('total', total1, {signed: true,},);
      if(total1 < 0){
        response.cookie('total', 100, {signed: true,},);
        return "Terminaste el juego";
      }else{
        return "Suma="+ resultado+"\nValor de la cookie="+ total1;
      }
    }
  }

  // Resta
  @Post('resta')
  @HttpCode(201)
  @Header('Resultado','valor')
  resta(
      @Body() ParametroCuerpo, @Req() request, @Res({passthrough: true}) response,
  ){
    var resultado = Number(ParametroCuerpo.numero1) - Number(ParametroCuerpo.numero2);
    response.header("Resultado",resultado);
    var total= request.signedCookies["total"];
    if(total == undefined) {
      response.cookie('total', 100, { signed: true, },);
      response.send('El valor de la cookie es 100');

    }else {
      var total1 = Number(total) - resultado;
      response.cookie('total', total1, {signed: true,},);
      if(total1 < 0){
        response.cookie('total', 100, {signed: true,},);
        return "Terminaste el juego";
      }else{
        return "Resta="+ resultado+"\nValor de la cookie="+ total1;
      }
    }
  }

  // Multiplicacion
  @Put('multiplicacion/:numero1/:numero2')
  @HttpCode(200)
  multiplicacion(
      @Param() ParametroRuta, @Req() request, @Res({passthrough: true}) response,
  ) {
    var resultado = Number(ParametroRuta.numero1) * Number(ParametroRuta.numero2);
    var total= request.signedCookies["total"];

    if(total == undefined) {
      response.cookie('total', 100, { signed: true, },);
      response.send('El valor de la cookie es 100');

    }else {
      var total1 = Number(total) - resultado;
      response.cookie('total', total1, {signed: true,},);
      if(total1 < 0){
        response.cookie('total', 100, {signed: true,},);
        return "Terminaste el juego";
      }else{
        return "Multiplicación="+ resultado+"\nValor de la cookie="+ total1;
      }
    }
  }

  //Division
  @Get('division')
  @HttpCode(200)
  divicion(
      @Headers() headers, @Req() request, @Res({passthrough: true}) response,
  ){
    var resultado = Number(headers.numero1) / Number(headers.numero2);
    var total= request.signedCookies["total"];
    if(total == undefined) {
      response.cookie('total', 100, { signed: true, },);
      response.send('El valor de la cookie es 100');
    }else {
      var total1 = Number(total) - resultado;
      response.cookie('total', total1, {signed: true,},);
      if(total1 < 0){
        response.cookie('total', 100, {signed: true,},);
        return "Terminaste el juego";
      }else{
        return "División="+ resultado+"\nValor de la cookie="+ total1;
      }
    }
  }
}
  

