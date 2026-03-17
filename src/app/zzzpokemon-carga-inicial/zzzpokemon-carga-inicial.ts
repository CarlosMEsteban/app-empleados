import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../zzzpokemon/zzzpokemon.service';
import { ZZZAtaquesService } from '../zzzataques/zzzataques.service';
import { ZzzmejoresAtaques } from '../zzzmejores-ataques/zzzmejores-ataques';
import { MisPokemonService } from '../zzzmis-pokemon/zzzmis-pokemon.service';
import { MultiplicadorPolvosService } from '../zzzmultiplicador-polvos/zzzmultiplicador-polvos.service';
import { TipoPokemonService } from '../zzztipo-pokemon/zzztipo-pokemon.service';
import { PokemonTipoPokemonService } from '../zzzpokemon-tipo-pokemon/zzzpokemon-tipo-pokemon.service';
import { MejoresAtaquesService } from '../zzzmejores-ataques/mejores-ataques.service';

@Component({
  selector: 'app-zzzpokemon-carga-inicial',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './zzzpokemon-carga-inicial.html',
  styleUrls: ['./zzzpokemon-carga-inicial.css']
})
export class ZzzPokemonCargaInicial {
  cargando = false;
  mensaje = '';

  // Opciones de carga (marcadas por defecto)
  cargarAtaques = true;
  cargarMejoresAtaques = true;
  cargarMisPokemon = true;
  cargarMultiplicadorPolvos = true;
  cargarPokemon = true;
  cargarPokemonTipoPokemon = true;
  cargarTipoPokemon = true;

  constructor(private ataquesServicio: ZZZAtaquesService,
                private mejoresAtaquesServicio: MejoresAtaquesService,
                private misPokemonServicio: MisPokemonService,
                private multiplicadorPolvosServicio: MultiplicadorPolvosService,
                private pokemonServicio: PokemonService,
                private pokemonTipoPokemonServicio: PokemonTipoPokemonService,
                private tipoPokemonServicio: TipoPokemonService) {}

  async cargarInicial() {
    this.cargando = true;
    this.mensaje = 'Cargando pokémon...';

    try {
        if (this.cargarAtaques) await this.ataquesServicio.cargarAtaques();
        if (this.cargarMejoresAtaques) await this.mejoresAtaquesServicio.cargarMejoresAtaquesIniciales();
        if (this.cargarMisPokemon) await this.misPokemonServicio.cargarMisPokemon();
        if (this.cargarMultiplicadorPolvos) await this.multiplicadorPolvosServicio.cargarMultiplicadoresIniciales();
        if (this.cargarPokemon) await this.pokemonServicio.cargarPokemonIniciales();
        if (this.cargarPokemonTipoPokemon) await this.pokemonTipoPokemonServicio.cargarIniciales();
        if (this.cargarTipoPokemon) await this.tipoPokemonServicio.cargarIniciales();
      
      this.mensaje = 'Carga inicial completada.';
    } catch (error) {
      console.error('Error al cargar inicial:', error);
      this.mensaje = 'Error al cargar los pokémon iniciales. Revisa la consola.';
    } finally {
      this.cargando = false;
    }
  }
}
