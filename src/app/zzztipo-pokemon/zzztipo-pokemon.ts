import { Component } from '@angular/core';
import { TipoPokemonService } from './zzztipo-pokemon.service';

@Component({
  selector: 'app-zzztipo-pokemon',
  imports: [],
  templateUrl: './zzztipo-pokemon.html',
  styleUrl: './zzztipo-pokemon.css'
})
export class ZzztipoPokemon {
tipoPokemonServicio: TipoPokemonService;
    constructor(tipoPokemonServicio: TipoPokemonService) {
      this.tipoPokemonServicio = tipoPokemonServicio;
    }
  async cargarTipoPokemon() {
    // Aquí puedes implementar la lógica para cargar los mejores ataques desde un archivo CSV
    console.log("Cargando tipos de pokemon desde CSV...");
try {
      await this.tipoPokemonServicio.cargarIniciales();
    } catch (error) {
      console.error('Error al cargar tipos de pokemon iniciales:', error);
      alert('Error al cargar tipos de pokemon iniciales.');
    }    
  }
}
