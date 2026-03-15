import { Component } from '@angular/core';
import { MisPokemonService } from './zzzmis-pokemon.service';

@Component({
  selector: 'app-zzzmis-pokemon',
  imports: [],
  templateUrl: './zzzmis-pokemon.html',
  styleUrl: './zzzmis-pokemon.css'
})
export class ZzzmisPokemon {
  misPokemonServicio: MisPokemonService;
    constructor(misPokemonServicio: MisPokemonService) {
      this.misPokemonServicio = misPokemonServicio;
    }
  async cargarMisPokemon() {
    // Aquí puedes implementar la lógica para cargar los mejores ataques desde un archivo CSV
    console.log("Cargando mis Pokémon desde CSV...");
try {
      await this.misPokemonServicio.cargarMisPokemon();
    } catch (error) {
      console.error('Error al cargar mis Pokémon:', error);
      alert('Error al cargar mis Pokémon.');
    }    
  }
}
