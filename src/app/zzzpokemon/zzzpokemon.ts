import { Component } from '@angular/core';
import { PokemonService } from './zzzpokemon.service';

@Component({
  selector: 'app-zzzpokemon',
  imports: [],
  templateUrl: './zzzpokemon.html',
  styleUrl: './zzzpokemon.css'
})
export class Zzzpokemon {
pokemonServicio: PokemonService;
    constructor(pokemonServicio: PokemonService) {
      this.pokemonServicio = pokemonServicio;
    }
  async cargarPokemon() {
    // Aquí puedes implementar la lógica para cargar los mejores ataques desde un archivo CSV
    console.log("Cargando pokemons");
try {
      await this.pokemonServicio.cargarPokemonIniciales();
    } catch (error) {
      console.error('Error al cargar pokemons iniciales:', error);
      alert('Error al cargar pokemons iniciales.');
    }    
  }
}
