import { Module } from '@nestjs/common';
import { MusicaService } from './musica.service';
import { MusicaController } from './musica.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [
    // modulos importados
  ],
  providers: [
    // declaramos servicio
    MusicaService,
    PrismaService,
  ],
  exports: [
    // exportamos servicio
    MusicaService,
  ],
  controllers: [
    // declaramos controladores
    MusicaController,
  ],
})
export class MusicaModule {}
