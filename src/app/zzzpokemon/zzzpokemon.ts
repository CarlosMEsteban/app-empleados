import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../zzzpokemon/zzzpokemon.service';
import { PokemonTipoPokemonService } from '../zzzpokemon-tipo-pokemon/zzzpokemon-tipo-pokemon.service';
import { PokemonTipoPokemonModel } from '../zzzpokemon-tipo-pokemon/zzzpokemon-tipo-pokemon.model';
import { PokemonModel } from './zzzpokemon.model';
import { TipoPokemonModel } from '../zzztipo-pokemon/zzztipo-pokemon.model';
import { MejoresAtaquesModel } from '../zzzmejores-ataques/zzzmejoresAataques.model';
import { MejoresAtaquesService } from '../zzzmejores-ataques/mejores-ataques.service';
import { ZZZAtaquesService } from '../zzzataques/zzzataques.service';
import { AtaqueModel } from '../zzzataques/zzzataques.model';

@Component({
  selector: 'app-zzzpokemon',
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './zzzpokemon.html',
  styleUrl: './zzzpokemon.css'
})
export class Zzzpokemon implements OnInit {
  pokemonServicio: PokemonService;
  pokemonTipoPokemonServicio: PokemonTipoPokemonService;
  tipoPokemonServicio: PokemonTipoPokemonService;
  mejoresAtaquesServicio: MejoresAtaquesService;
  ataquesService: ZZZAtaquesService;
  listaPokemones: Array<PokemonModel & { id: string }> = [];
  listaTiposPokemon: Array<PokemonTipoPokemonModel & { id: string }> = [];
  listaPokemonTipoPokemon: Array<PokemonTipoPokemonModel & { id: string }> = [];
  listaMejoresAtaques: Array<MejoresAtaquesModel & { id: string }> = [];
  nuevoPokemon: string = '';
  listaTipos: PokemonTipoPokemonModel[] = [];
  listaAtaques: AtaqueModel[] = [];
  nuevoTipoSeleccionado: string = '';
  nuevoMejorAtaque: string = '';
  bMuestrarTipos: boolean = false;
  bmuestraMejoresAtaques: boolean = false;




    constructor(pokemonServicio: PokemonService, 
              pokemonTipoPokemonServicio: PokemonTipoPokemonService, 
              mejoresAtaquesServicio: MejoresAtaquesService,
              ataquesService: ZZZAtaquesService,
              ) {
      this.pokemonServicio = pokemonServicio;
      this.pokemonTipoPokemonServicio = pokemonTipoPokemonServicio;
      this.mejoresAtaquesServicio = mejoresAtaquesServicio;
      this.tipoPokemonServicio = pokemonTipoPokemonServicio;
      this.ataquesService = ataquesService;
    }

    async ngOnInit() {
      this.listaTiposPokemon = await this.tipoPokemonServicio.obtenerPokemonTipoPokemon();
      this.listaAtaques = await this.ataquesService.obtenerAtaques();
    }

    async guardarPokemon() {
      if (this.nuevoPokemon.trim() === '') {
        alert('El nombre del Pokémon no puede estar vacío.');
        return;
      }
      else {
        this.listaPokemones = await this.pokemonServicio.obtenerPokemons();
        const pokemonExistente = this.listaPokemones.find(p => p.nombre.toLowerCase() === this.nuevoPokemon.trim().toLowerCase());
        if (pokemonExistente) {
          alert('Ya existe un Pokémon con ese nombre.');
          return;
        }
        else {
          const pokemon = new PokemonModel(this.nuevoPokemon.trim());
          await this.pokemonServicio.agregarPokemon(pokemon);
          this.bMuestrarTipos = true;
          this.bmuestraMejoresAtaques = true;
          this.nuevoTipoSeleccionado = '';
          this.nuevoMejorAtaque = '';
          
        }
      }
    }

    cancelarEdicion() {
      this.nuevoPokemon = '';
      this.bMuestrarTipos = false;
      this.bmuestraMejoresAtaques = false;
      this.nuevoTipoSeleccionado = '';
      this.nuevoMejorAtaque = '';
    }

    agregarTipoPokemon() {
      if (this.nuevoTipoSeleccionado === '') {
        alert('Debe seleccionar un tipo de Pokémon.');
        return;
      }
      else if (this.nuevoPokemon.trim() === '') {
        alert('El nombre del Pokémon no puede estar vacío.');
        return;
      }
      else {
        const pokemonTipo = new PokemonTipoPokemonModel(this.nuevoPokemon.trim(), this.nuevoTipoSeleccionado);
        this.pokemonTipoPokemonServicio.agregarPokemonTipoPokemon(pokemonTipo);
        this.listaPokemonTipoPokemon.push({ ...pokemonTipo, id: '' });
        this.nuevoTipoSeleccionado = '';
      }
    }

    agregarMejorAtaque() {
      if (this.nuevoMejorAtaque === '') {
        alert('Debe seleccionar un mejor ataque para el Pokémon.');
        return;
      }
      else if (this.nuevoPokemon.trim() === '') {
        alert('El nombre del Pokémon no puede estar vacío.');
        return;
      }
      else {
        const mejorAtaque = new MejoresAtaquesModel(this.nuevoPokemon.trim(), this.nuevoMejorAtaque);
        this.mejoresAtaquesServicio.addMejoresAtaques(mejorAtaque);
        this.listaMejoresAtaques.push({ ...mejorAtaque, id: '' });
        this.nuevoMejorAtaque = '';
      }
    }    
}
