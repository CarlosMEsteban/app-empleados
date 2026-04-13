import { Component, OnInit} from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MisPokemonService } from '../zzzmis-pokemon/zzzmis-pokemon.service';
import { ZZZAtaquesService } from '../zzzataques/zzzataques.service';
import { PokemonTipoPokemonService } from '../zzzpokemon-tipo-pokemon/zzzpokemon-tipo-pokemon.service';
import { MisPokemonModel } from '../zzzmis-pokemon/zzzmisPokemon.model';
import { AtaqueModel } from '../zzzataques/zzzataques.model';
import { MultiplicadorPolvosService } from '../zzzmultiplicador-polvos/zzzmultiplicador-polvos.service';
import { MultiplicadorPolvosModel } from '../zzzmultiplicador-polvos/multiplicadorPolvos.model';


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
    multiplicadorServicio: MultiplicadorPolvosService;
    listaMisPokemones: Array<MisPokemonModel & { id: string }> = [];
    listaAtaques: AtaqueModel[] = [];
    filtroBusqueda: string = '';
    listaMultiplicadores: Array<MultiplicadorPolvosModel & { id: string }> = [];
    cargando = false;
    mensaje = '';
    editandoId: string | null = null;
    iCambiarAtaque: number | null = null;
    nuevoAtaqueCargado: string = '';
    nuevoDPSETBAtaqueCargado: number = 0;
    nuevoBNOPuedeMejorarCargado: boolean = false;
  
  constructor(misPokemonServicio: MisPokemonService, ataquesServicio: ZZZAtaquesService, pokemonTipoPokemonServicio: PokemonTipoPokemonService  , multiplicadorServicio: MultiplicadorPolvosService) {
    this.misPokemonServicio = misPokemonServicio;
    this.ataquesServicio = ataquesServicio;
    this.pokemonTipoPokemonServicio = pokemonTipoPokemonServicio;
    this.multiplicadorServicio = multiplicadorServicio;
  }
  async ngOnInit(): Promise<void> {
    this.calculos();
  }

  async calculos()
  { 
    await this.cargarAtaques();
    await this.misPokemones();
    await this.cargarMultiplicadores();
  }

  async cargarAtaques() {
    try {
      this.listaAtaques = await this.ataquesServicio.todos();
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
      this.misPokemonServicio.obtenerMisPokemonPorDPSETBCargado().then(misPokemon => {
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

  async cargarMultiplicadores() {
    try {
      this.listaMultiplicadores = await this.multiplicadorServicio.obtenerMultiplicadores();  
    } catch (error) {
      console.error('Error al cargar multiplicadores de polvos:', error);
      this.mensaje = 'Error al cargar multiplicadores de polvos';
    }
  }

  editarAtaqueCargado(misPokemon: MisPokemonModel & { id: string }, i: number)
  {
    this.iCambiarAtaque = i;
    this.nuevoAtaqueCargado = misPokemon.AtaqueCargado;
    this.nuevoDPSETBAtaqueCargado = misPokemon.DPSETBAtaqueCargado;
    this.nuevoBNOPuedeMejorarCargado = misPokemon.BNOPuedeMejorarCargado;
    this.editandoId = misPokemon.id;
    console.log(`Editando ataque cargado de ${misPokemon.nombre} (ID: ${misPokemon.id})`);
  }

  async guardarCAmbioAtaqueCargado(misPokemon: MisPokemonModel & { id: string }, i: number)
  {
    if (this.editandoId === misPokemon.id) {
      misPokemon.AtaqueCargado = this.nuevoAtaqueCargado;
      this.calcularDPSETBAtaqueCargado(misPokemon);
      await this.misPokemonServicio.modificarMisPokemon(misPokemon.id!, {
                                                    AtaqueCargado: this.nuevoAtaqueCargado,
                                                    DPSETBAtaqueCargado: misPokemon.DPSETBAtaqueCargado,
                                                    ValorConMultiplicador: misPokemon.ValorConMultiplicador,
                                                    ValorSinMultiplicador: misPokemon.ValorSinMultiplicador,
                                                    BNOPuedeMejorarCargado: this.nuevoBNOPuedeMejorarCargado
                                                  });
      this.cancelarEdicionAtaqueCargado();
      this.listaMisPokemones = [];
      await this.misPokemones();


      
    }
  }

  cancelarEdicionAtaqueCargado()
  {
    this.iCambiarAtaque = null;
    this.editandoId = null;
    console.log('Edición de ataque cargado cancelada');
  }

  private async calcularDPSETBAtaqueCargado(miPokemon: MisPokemonModel)
  {
    //const multiplicador = this.multiplicadorServicio.obtenerMultiplicadorPorPolvos(miPokemon.Polvos);
    const multiplicador = this.listaMultiplicadores.find(m => m.polvos == miPokemon.Polvos);
    /*let multi = -1;
    this.listaMultiplicadores.forEach(m => {
      console.log(`Comparando polvos: ${m.polvos} con ${miPokemon.Polvos}`);
      if(m.polvos === miPokemon.Polvos)
        multi = m.multiplicador;
    });
    if (multi === -1) {
      console.error(`No se encontró un multiplicador para los polvos: ${miPokemon.Polvos}`);
      this.mensaje = `Error: No se encontró un multiplicador para los polvos: ${miPokemon.Polvos}`;
     
    }
    else
      console.log(`Multiplicador encontrado: ${multi}`);
*/
    const ataque = this.listaAtaques.find(a => a.movimiento === this.nuevoAtaqueCargado);
    if (multiplicador && ataque) {
console.log(`Calculando DPSETBAtaqueCargado para ${miPokemon.nombre} con ataque ${ataque.movimiento} y multiplicador ${multiplicador.multiplicador}`);
      const pTP = await this.pokemonTipoPokemonServicio.obtenerPorPokemonYTipo(miPokemon.nombre, ataque.tipoAtaque);
      if (pTP) 
        this.misPokemonServicio.calcularCargado(miPokemon, ataque.DPS, multiplicador.multiplicador, 1.2);
      else
        this.misPokemonServicio.calcularCargado(miPokemon, ataque.DPS, multiplicador.multiplicador, 1);
    }
    else
      console.error(`No se encontró el ataque o el multiplicador para calcular DPSETBAtaqueCargado de ${miPokemon.nombre}`);

  }    
}
