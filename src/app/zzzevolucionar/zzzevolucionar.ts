import { Component, OnInit} from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { evolucionarModel } from './zzzevolucionar.model';
import { EvolucionarService } from './zzzevolucionar.service';

@Component({
  selector: 'app-zzzevolucionar',
  imports: [FormsModule, NgFor, NgIf, CommonModule],
  templateUrl: './zzzevolucionar.html',
  styleUrl: './zzzevolucionar.css'
})
export class Zzzevolucionar implements OnInit{
  evolucionarServicio: EvolucionarService;
  listaAEvolucionar: Array<evolucionarModel & { id: string }> = [];
  nuevoAEvolucionar: evolucionarModel = new evolucionarModel('', '', false, false);
  cuantosPosibles: number = 0;

  constructor(evolucionarServicio: EvolucionarService) {
    this.evolucionarServicio = evolucionarServicio;
  }

  async ngOnInit() {
    await this.cargarAEvolucionar();
  }

  async cargarAEvolucionar() {
    try {
      this.listaAEvolucionar = await this.evolucionarServicio.obtener();
      this.cuantosPosibles = this.listaAEvolucionar.filter(pok => pok.bPosible).length;
    } catch (error) {
      console.error('Error al cargar pokémon para evolucionar:', error);
    }
  }

  async agregarAEvolucionar() {
    try {
      await this.evolucionarServicio.agregar(this.nuevoAEvolucionar);
      this.nuevoAEvolucionar = new evolucionarModel('', '', false, false);
      await this.cargarAEvolucionar();
    } catch (error) {
      console.error('Error al agregar pokémon para evolucionar:', error);
    } 
  }

  async eliminarAEvolucionar(id: string) {
    try {
      await this.evolucionarServicio.eliminar(id);
      await this.cargarAEvolucionar();
    } catch (error) {
      console.error('Error al eliminar pokémon para evolucionar:', error);
    }
  }

}
