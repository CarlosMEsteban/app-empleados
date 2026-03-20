import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MisPokemonService } from '../zzzmis-pokemon/zzzmis-pokemon.service';
import { MisPokemonModel } from '../zzzmis-pokemon/zzzmisPokemon.model';


@Component({
  selector: 'app-zzzmas-poder',
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './zzzmas-poder.html',
  styleUrl: './zzzmas-poder.css'
})
export class ZzzmasPoder implements OnInit {
  misPokemonServicio: MisPokemonService;
  listaMisPokemones: Array<MisPokemonModel & { id: string }> = [];
  filtroBusqueda = '';
  mensaje = '';
  cargando = false;


constructor(misPokemonServicio: MisPokemonService) {
    this.misPokemonServicio = misPokemonServicio;
  }  

   async ngOnInit() {
    await this.misPokemones();
   }

  async misPokemones() {
    this.cargando = true;
    try {
      this.listaMisPokemones = await this.misPokemonServicio.obtenerMisPokemon();
      this.listaMisPokemones.sort(MisPokemonModel.multiSort([{ field: "Polvos", dir: "asc" }, { field: "ValorConMultiplicador", dir: "desc" }, { field: "PC", dir: "desc" }]));
      this.mensaje = `Cargados ${this.listaMisPokemones.length} misPokemon`;
    } catch (error) {
      console.error('Error al obtener misPokemon:', error);
      this.mensaje = 'Error al cargar misPokemon';
    } finally {
      this.cargando = false;
    }
  }

  get listaFiltrada() {
    if (!this.filtroBusqueda.trim()) {
      return this.listaMisPokemones;
    }
    const filtro = this.filtroBusqueda.toLowerCase();
    return this.listaMisPokemones.filter((mp: MisPokemonModel & { id: string }) => 
      mp.nombre.toLowerCase().includes(filtro) ||
      mp.AtaqueRapido.toLowerCase().includes(filtro) ||
      mp.AtaqueCargado.toLowerCase().includes(filtro)
    );
  }


}
