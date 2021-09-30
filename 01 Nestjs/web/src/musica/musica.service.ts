import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MusicaService {
  constructor(
    // Inyectar dependencias
    private prisma: PrismaService,
  ) {}

  buscarMuchos(parametrosBusqueda: {
    skip?: number; // registros que te saltes 0 10 20
    take?: number; // registros tomas 10 10 10
    busqueda?: string; 
  }) {
    const or = parametrosBusqueda.busqueda
      ? {
          OR: [
            { nombre: { contains: parametrosBusqueda.busqueda } },
            { autor: { contains: parametrosBusqueda.busqueda } },
          ],
        }
      : {};
    console.log(or);
    return this.prisma.musica.findMany({
      where: or,
      take: Number(parametrosBusqueda.take) || undefined,
      skip: Number(parametrosBusqueda.skip) || undefined,
    });
  }

  buscarUno(id: number) {
    return this.prisma.musica.findUnique({
      where: {
        id: id,
      },
    });
  }

  crearUno(musica: Prisma.MusicaCreateInput) {
    return this.prisma.musica.create({
      data: musica,
    });
  }

  actualizarUno(parametrosActualizar: {
    id: number;
    data: Prisma.MusicaUpdateInput;
  }) {
    return this.prisma.musica.update({
      data: parametrosActualizar.data,
      where: {
        id: parametrosActualizar.id,
      },
    });
  }

  eliminarUno(id: number) {
    return this.prisma.musica.delete({
      where: { id: id },
    });
  }
}
