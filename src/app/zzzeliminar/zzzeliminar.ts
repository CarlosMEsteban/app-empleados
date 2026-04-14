import { Component } from '@angular/core';
import { MisPokemonService } from '../zzzmis-pokemon/zzzmis-pokemon.service';
import { MisPokemonModel } from '../zzzmis-pokemon/zzzmisPokemon.model';

@Component({
  selector: 'app-zzzeliminar',
  imports: [],
  templateUrl: './zzzeliminar.html',
  styleUrl: './zzzeliminar.css',
})
export class Zzzeliminar {
  misPokemonServicio: MisPokemonService;
  listaMisPokemones: Array<MisPokemonModel & { id: string }> = [];
  cargando = false;
  mensaje = '';
  constructor(misPokemonServicio: MisPokemonService, ) {
      this.misPokemonServicio = misPokemonServicio;
    }  

  async ngOnInit() {
    await this.misPokemones();
   }

  async misPokemones() {
    this.cargando = true;
    try {
      this.listaMisPokemones = await this.misPokemonServicio.obtenerNoUnicos();
      this.listaMisPokemones.sort(MisPokemonModel.multiSort([{ field: "ValorSinMultiplicador", dir: "asc" }]));
      this.mensaje = `Cargados ${this.listaMisPokemones.length} misPokemon`;
    } catch (error) {
      console.error('Error al obtener misPokemon:', error);
      this.mensaje = 'Error al cargar misPokemon';
    } finally {
      this.cargando = false;
    }
  }   

  async eliminar(i: number) {
    const misPok = this.listaMisPokemones[i];
    if (confirm(`¿Estás seguro de que deseas eliminar a ${misPok.nombre} con PC ${misPok.PC}?`)) {
      try {
        await this.misPokemonServicio.eliminarMisPokemon(misPok.id!);
        this.listaMisPokemones = this.listaMisPokemones.filter(mp => mp.id !== misPok.id);
        this.mensaje = `${misPok.nombre} eliminado exitosamente.`;
      } catch (error) {
        console.error('Error al eliminar misPokemon:', error);
        this.mensaje = 'Error al eliminar misPokemon';
      }
    }
  }
}
