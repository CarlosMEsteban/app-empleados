import { Component } from '@angular/core';
import { PokemonTipoPokemonService } from './zzzpokemon-tipo-pokemon.service';

@Component({
  selector: 'app-zzzpokemon-tipo-pokemon',
  imports: [],
  templateUrl: './zzzpokemon-tipo-pokemon.html',
  styleUrl: './zzzpokemon-tipo-pokemon.css'
})
export class ZzzpokemonTipoPokemon {
pokemonTipoPokemonServicio: PokemonTipoPokemonService;
    constructor(pokemonTipoPokemonServicio: PokemonTipoPokemonService) {
      this.pokemonTipoPokemonServicio = pokemonTipoPokemonServicio;
    }
  async cargarPokemonTipoPokemon() {
    // Aquí puedes implementar la lógica para cargar los mejores ataques desde un archivo CSV
    console.log("Cargando tipos de cada pokemon desde CSV...");
try {
      await this.pokemonTipoPokemonServicio.cargarIniciales();
    } catch (error) {
      console.error('Error al cargar tipos de cada pokemon iniciales:', error);
      alert('Error al cargar tipos de cada pokemon iniciales.');
    }    
  }
}
