import { Component, OnInit} from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MisPokemonService } from '../zzzmis-pokemon/zzzmis-pokemon.service';
import { ZZZAtaquesService } from '../zzzataques/zzzataques.service';
import { PokemonTipoPokemonService } from '../zzzpokemon-tipo-pokemon/zzzpokemon-tipo-pokemon.service';
import { MisPokemonModel } from '../zzzmis-pokemon/zzzmisPokemon.model';
import { AtaqueModel } from '../zzzataques/zzzataques.model';


@Component({
  selector: 'app-zzzcambiar-at-cargado',
  imports: [CommonModule, FormsModule, NgFor, NgIf],
  templateUrl: './zzzcambiar-at-cargado.html',
  styleUrl: './zzzcambiar-at-cargado.css'
})
export class ZzzcambiarAtCargado implements OnInit {
    misPokemonServicio: MisPokemonService;
    ataquesServicio: ZZZAtaquesService;
    pokemonTipoPokemonServicio: PokemonTipoPokemonService;
    listaMisPokemones: Array<MisPokemonModel & { id: string }> = [];
    listaAtaques: AtaqueModel[] = [];
    filtroBusqueda: string = '';
    cargando = false;
    mensaje = '';
    editandoId: string | null = null;
    iCambiarAtaque: number | null = null;
    nuevoAtaqueCargado: string = '';
    nuevoDPSETBAtaqueCargado: number = 0;
    nuevoBNOPuedeMejorarCargado: boolean = false;
  
  constructor(misPokemonServicio: MisPokemonService, ataquesServicio: ZZZAtaquesService, pokemonTipoPokemonServicio: PokemonTipoPokemonService) {
    this.misPokemonServicio = misPokemonServicio;
    this.ataquesServicio = ataquesServicio;
    this.pokemonTipoPokemonServicio = pokemonTipoPokemonServicio;
  }
  async ngOnInit(): Promise<void> {
    this.calculos();
  }

  async calculos()
  { 
    await this.cargarAtaques();
    await this.misPokemones();
  }

  async cargarAtaques() {
    try {
      this.listaAtaques = await this.ataquesServicio.obtenerAtaques();
      this.listaAtaques.sort((a, b) => a.movimiento.localeCompare(b.movimiento));
    } catch (error) {
      console.error('Error al cargar ataques:', error);
      this.mensaje = 'Error al cargar la lista de ataques';
    }
  }

  async misPokemones() {
    this.cargando = true;
    try {
      // Como no puedo ordenar y filtrar a la vez, obtengo los misPokemon ya ordenados por DPSETBAtaqueCargado y luego filtro por el que no pueden mejorar el ataque cargado
      this.misPokemonServicio.obtenerMisPokemonPorDPSETBCargadoNoPuedeMejorar().then(misPokemon => {
        (misPokemon).forEach(mp => {
          if(! mp.BNOPuedeMejorarCargado)
          {
            this.listaMisPokemones.push(mp);
          }
        });
      
      });
      this.mensaje = `Cargados ${this.listaMisPokemones.length} misPokemon`;
    } catch (error) {
      console.error('Error al obtener misPokemon:', error);
      this.mensaje = 'Error al cargar misPokemon';
    } finally {
      this.cargando = false;
    }
  }

  editarAtaqueCargado(misPok: MisPokemonModel, i: number)
  {
    this.iCambiarAtaque = i;
    this.nuevoAtaqueCargado = misPok.AtaqueCargado;
    this.nuevoDPSETBAtaqueCargado = misPok.DPSETBAtaqueCargado;
    this.nuevoBNOPuedeMejorarCargado = misPok.BNOPuedeMejorarCargado;
  }


}
