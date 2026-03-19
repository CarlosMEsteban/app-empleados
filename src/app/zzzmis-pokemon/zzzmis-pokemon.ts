import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MisPokemonService } from './zzzmis-pokemon.service';
import { MisPokemonModel } from './zzzmisPokemon.model';
import { PokemonService } from '../zzzpokemon/zzzpokemon.service';
import { PokemonModel } from '../zzzpokemon/zzzpokemon.model';
import { MultiplicadorPolvosService } from '../zzzmultiplicador-polvos/zzzmultiplicador-polvos.service';
import { MultiplicadorPolvosModel } from '../zzzmultiplicador-polvos/multiplicadorPolvos.model';
import { ZZZAtaquesService } from '../zzzataques/zzzataques.service';
import { AtaqueModel } from '../zzzataques/zzzataques.model';
import { ZzzpokemonTipoPokemon } from '../zzzpokemon-tipo-pokemon/zzzpokemon-tipo-pokemon';
import { PokemonTipoPokemonService } from '../zzzpokemon-tipo-pokemon/zzzpokemon-tipo-pokemon.service';
import { ZzztipoPokemon } from '../zzztipo-pokemon/zzztipo-pokemon';
import { TipoPokemonService } from '../zzztipo-pokemon/zzztipo-pokemon.service';

@Component({
  selector: 'app-zzzmis-pokemon',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './zzzmis-pokemon.html',
  styleUrl: './zzzmis-pokemon.css'
})
export class ZzzmisPokemon implements OnInit {
  misPokemonServicio: MisPokemonService;
  pokemonServicio: PokemonService;
  multiplicadorPolvosServicio: MultiplicadorPolvosService;
  ataquesServicio: ZZZAtaquesService;
  pokemonTipoPokemonServicio: PokemonTipoPokemonService;
  tipoPokemonServicio: TipoPokemonService;
  listaGeneral: Array<MisPokemonModel & { id: string }> = [];
  listaPokemones: Array<PokemonModel & { id: string }> = [];
  listaMultiplicadorPolvos: Array<MultiplicadorPolvosModel & { id: string }> = [];
  listaAtaques: AtaqueModel[] = [];
  filtroBusqueda: string = '';
  cargando = false;
  mensaje = '';
  
  // Variables para formulario
  nuevoMisPokemon: MisPokemonModel = new MisPokemonModel(
    '', false, 0, 0, 0, '', 0, false, '', 0, false, 0, false, 0
  );
  editandoId: string | null = null;
  mostrarFormulario = false;

  constructor(misPokemonServicio: MisPokemonService, pokemonServicio: PokemonService, multiplicadorPolvosServicio: MultiplicadorPolvosService, ataquesServicio: ZZZAtaquesService, pokemonTipoPokemonServicio: PokemonTipoPokemonService, tipoPokemonServicio: TipoPokemonService) {
    this.misPokemonServicio = misPokemonServicio;
    this.pokemonServicio = pokemonServicio;
    this.multiplicadorPolvosServicio = multiplicadorPolvosServicio;
    this.ataquesServicio = ataquesServicio;
    this.pokemonTipoPokemonServicio = pokemonTipoPokemonServicio;
    this.tipoPokemonServicio = tipoPokemonServicio;

  }

  async ngOnInit() {
    await this.cargarPokemones();
    await this.cargarMultiplicadorPolvos();
    await this.cargarAtaques();
    await this.obtenerTodos();
  }

  async cargarPokemones() {
    try {
      this.listaPokemones = await this.pokemonServicio.obtenerPokemons();
    } catch (error) {
      console.error('Error al cargar pokémon:', error);
      this.mensaje = 'Error al cargar la lista de pokémon';
    }
  }

  async cargarMultiplicadorPolvos() {
    try {
      this.listaMultiplicadorPolvos = await this.multiplicadorPolvosServicio.obtenerMultiplicadores();
    } catch (error) {
      console.error('Error al cargar multiplicadores de polvos:', error);
      this.mensaje = 'Error al cargar los valores de polvos';
    }
  }

  async cargarAtaques() {
    try {
      this.listaAtaques = await this.ataquesServicio.obtenerAtaques();
    } catch (error) {
      console.error('Error al cargar ataques:', error);
      this.mensaje = 'Error al cargar la lista de ataques';
    }
  }

  async obtenerTodos() {
    this.cargando = true;
    try {
      this.listaGeneral = await this.misPokemonServicio.obtenerMisPokemon();
      this.mensaje = `Cargados ${this.listaGeneral.length} misPokemon`;
    } catch (error) {
      console.error('Error al obtener misPokemon:', error);
      this.mensaje = 'Error al cargar misPokemon';
    } finally {
      this.cargando = false;
    }
  }

  limpiarFormulario() {
    this.nuevoMisPokemon = new MisPokemonModel(
      '', false, 0, 0, 0, '', 0, false, '', 0, false, 0, false, 0
    );
    this.editandoId = null;
    this.mostrarFormulario = false;
  }

  abrirFormulario() {
    this.limpiarFormulario();
    this.mostrarFormulario = true;
  }

  async guardarMisPokemon() {
    try {
      if (!this.nuevoMisPokemon.nombre.trim()) {
        this.mensaje = 'El nombre es requerido';
        return;
      }

      if (this.editandoId) {
        await this.misPokemonServicio.modificarMisPokemon(this.editandoId, this.nuevoMisPokemon);
        this.mensaje = 'MisPokemon actualizado correctamente';
      } else {
        await this.misPokemonServicio.agregarMisPokemon(this.nuevoMisPokemon);
        this.mensaje = 'MisPokemon agregado correctamente';
      }
      this.limpiarFormulario();
      await this.obtenerTodos();
    } catch (error) {
      console.error('Error al guardar:', error);
      this.mensaje = 'Error al guardar misPokemon';
    }
  }

  editarMisPokemon(misPokemon: MisPokemonModel & { id: string }) {
    this.nuevoMisPokemon = { ...misPokemon };
    this.editandoId = misPokemon.id;
    this.mostrarFormulario = true;
    this.calcularCadena();
  }

  async eliminarMisPokemon(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este MisPokemon?')) {
      try {
        await this.misPokemonServicio.eliminarMisPokemon(id);
        this.mensaje = 'MisPokemon eliminado correctamente';
        await this.obtenerTodos();
      } catch (error) {
        console.error('Error al eliminar:', error);
        this.mensaje = 'Error al eliminar misPokemon';
      }
    }
  }

  async cargarMisPokemonIniciales() {
    this.cargando = true;
    this.mensaje = 'Cargando misPokemon iniciales...';

    try {
      await this.misPokemonServicio.cargarMisPokemon();
      this.mensaje = 'Carga inicial completada.';
      await this.obtenerTodos();
    } catch (error) {
      console.error('Error al cargar inicial:', error);
      this.mensaje = 'Error al cargar los misPokemon iniciales.';
    } finally {
      this.cargando = false;
    }
  }

  get listaFiltrada() {
    if (!this.filtroBusqueda.trim()) {
      return this.listaGeneral;
    }
    const filtro = this.filtroBusqueda.toLowerCase();
    return this.listaGeneral.filter((mp: MisPokemonModel & { id: string }) => 
      mp.nombre.toLowerCase().includes(filtro) ||
      mp.AtaqueRapido.toLowerCase().includes(filtro) ||
      mp.AtaqueCargado.toLowerCase().includes(filtro)
    );
  }

  cancelarEdicion() {
    this.limpiarFormulario();
  }

  calcularCadena() {
    console.log('Pokémon seleccionado:', this.nuevoMisPokemon.nombre);
    this.nuevoMisPokemon.cadena = "";

    const ataqueCargado = this.listaAtaques.find(a => a.movimiento === this.nuevoMisPokemon.AtaqueCargado);
    console.log('Ataque cargado seleccionado:', ataqueCargado);
    if (ataqueCargado) 
    {
      
      this.tipoPokemonServicio.obtenerCadenaPorTipo(ataqueCargado.tipoAtaque).then(cadena => {
        this.nuevoMisPokemon.cadena += cadena;
        console.log('Cadena ataque cargado (async):', cadena);
      });
      
    }
    const ataqueRapido = this.listaAtaques.find(a => a.movimiento === this.nuevoMisPokemon.AtaqueRapido);
    console.log('Ataque rápido seleccionado:', ataqueRapido);
    if (ataqueRapido) 
    {
      this.tipoPokemonServicio.obtenerCadenaPorTipo(ataqueRapido.tipoAtaque).then(cadena => {
        this.nuevoMisPokemon.cadena += cadena;
        console.log('Cadena ataque rápido (async):', cadena);
      });
    }


  }
}
