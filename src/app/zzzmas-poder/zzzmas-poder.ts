import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MisPokemonService } from '../zzzmis-pokemon/zzzmis-pokemon.service';
import { MisPokemonModel } from '../zzzmis-pokemon/zzzmisPokemon.model';
import { PokemonTipoPokemonService } from '../zzzpokemon-tipo-pokemon/zzzpokemon-tipo-pokemon.service';
import { PokemonTipoPokemonModel } from '../zzzpokemon-tipo-pokemon/zzzpokemon-tipo-pokemon.model';


@Component({
  selector: 'app-zzzmas-poder',
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './zzzmas-poder.html',
  styleUrl: './zzzmas-poder.css'
})
export class ZzzmasPoder implements OnInit {
  misPokemonServicio: MisPokemonService;
  pokemonTipoPokemonServicio: PokemonTipoPokemonService;
  listaMisPokemones: Array<MisPokemonModel & { id: string }> = [];
  listaPokemonTipoPokemon: Array<PokemonTipoPokemonModel & { id: string }> = [];
  filtroBusqueda = '';
  mensaje = '';
  cargando = false;
  iAumentarPoder = -1;
  nuevoPoderPC = -1;
  nuevoPoderSalud = -1;

constructor(misPokemonServicio: MisPokemonService, pokemonTipoPokemonServicio: PokemonTipoPokemonService) {
    this.misPokemonServicio = misPokemonServicio;
    this.pokemonTipoPokemonServicio = pokemonTipoPokemonServicio;
  }  

   async ngOnInit() {
    this.listaPokemonTipoPokemon = await this.pokemonTipoPokemonServicio.obtenerPokemonTipoPokemon()
    await this.misPokemones();
   }

  async misPokemones() {
    this.cargando = true;
    try {
      this.listaMisPokemones = await this.misPokemonServicio.obtenerMisPokemon();
      this.listaMisPokemones.sort(MisPokemonModel.multiSort([{ field: "Polvos", dir: "asc" }, { field: "ValorConMultiplicador", dir: "desc" }, { field: "PC", dir: "desc" }]));
      this.misPokemonServicio.calcularCadenaTipoPokemon(this.listaMisPokemones, this.listaPokemonTipoPokemon);



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

  editarPoder(misPok: MisPokemonModel, i: number)
  {
    this.iAumentarPoder = i;
    this.nuevoPoderPC = misPok.PC;
    this.nuevoPoderSalud = misPok.Salud;
  }

  confirmarAumentoPoder(misPok: MisPokemonModel, i: number)
  {
    this.misPokemonServicio.aumentarPoder(misPok.AtaqueRapido, misPok.PC, misPok.Salud);
    this.iAumentarPoder = -1;
  }

  cancelarAumentoPoder()
  {
    this.iAumentarPoder = -1;
    this.nuevoPoderPC = -1;
    this.nuevoPoderSalud = -1;
  }
}
