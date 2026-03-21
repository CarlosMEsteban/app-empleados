import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MisPokemonService } from '../zzzmis-pokemon/zzzmis-pokemon.service';
import { MisPokemonModel } from '../zzzmis-pokemon/zzzmisPokemon.model';
import { PokemonTipoPokemonService } from '../zzzpokemon-tipo-pokemon/zzzpokemon-tipo-pokemon.service';
import { PokemonTipoPokemonModel } from '../zzzpokemon-tipo-pokemon/zzzpokemon-tipo-pokemon.model';
import { MultiplicadorPolvosService } from '../zzzmultiplicador-polvos/zzzmultiplicador-polvos.service';
import { MultiplicadorPolvosModel } from '../zzzmultiplicador-polvos/multiplicadorPolvos.model';


@Component({
  selector: 'app-zzzmas-poder',
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './zzzmas-poder.html',
  styleUrl: './zzzmas-poder.css'
})
export class ZzzmasPoder implements OnInit {
  misPokemonServicio: MisPokemonService;
  pokemonTipoPokemonServicio: PokemonTipoPokemonService;
  multiplicadorPolvosServicio: MultiplicadorPolvosService;
  listaMisPokemones: Array<MisPokemonModel & { id: string }> = [];
  listaPokemonTipoPokemon: Array<PokemonTipoPokemonModel & { id: string }> = [];
  listaMultiplicadorPolvos: Array<MultiplicadorPolvosModel & { id: string }> = [];
  filtroBusqueda = '';
  mensaje = '';
  cargando = false;
  iAumentarPoder = -1;
  nuevoPoderPC = -1;
  nuevoPoderSalud = -1;
  nuevoPoderPolvos = -1;

constructor(misPokemonServicio: MisPokemonService, pokemonTipoPokemonServicio: PokemonTipoPokemonService, multiplicadorPolvosServicio: MultiplicadorPolvosService) {
    this.misPokemonServicio = misPokemonServicio;
    this.pokemonTipoPokemonServicio = pokemonTipoPokemonServicio;
    this.multiplicadorPolvosServicio = multiplicadorPolvosServicio;
  }  

   async ngOnInit() {
    this.listaPokemonTipoPokemon = await this.pokemonTipoPokemonServicio.obtenerPokemonTipoPokemon()
    await this.misPokemones();
    await this.cargarMultiplicadorPolvos();
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

  async cargarMultiplicadorPolvos() {
    try {
      this.listaMultiplicadorPolvos = await this.multiplicadorPolvosServicio.obtenerMultiplicadores();
      this.listaMultiplicadorPolvos.sort((a, b) => a.polvos - b.polvos);
    } catch (error) {
      console.error('Error al cargar multiplicadores de polvos:', error);
      this.mensaje = 'Error al cargar los valores de polvos';
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
    this.nuevoPoderPolvos = misPok.Polvos;
  }

  async confirmarAumentoPoder(id: string, i: number)
  {
    this.misPokemonServicio.aumentarPoder(id, this.nuevoPoderPC, this.nuevoPoderSalud, this.nuevoPoderPolvos);
    this.iAumentarPoder = -1;
    await this.misPokemones();
  }

  cancelarAumentoPoder()
  {
    this.iAumentarPoder = -1;
    this.nuevoPoderPC = -1;
    this.nuevoPoderSalud = -1;
    this.nuevoPoderPolvos = -1;
  }
}
