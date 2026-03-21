import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SinEvolucionarService } from './zzzsin-evolucionar.service';
import { SinEvolucionarModel } from './zzzsin-evolucionar.model';


@Component({
  selector: 'app-zzzsin-evolucionar',
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  templateUrl: './zzzsin-evolucionar.html',
  styleUrl: './zzzsin-evolucionar.css'
})
export class ZzzsinEvolucionar {
  sinEvolucionarServicio: SinEvolucionarService;
  listaSinEvolucionar: Array<SinEvolucionarModel & { id: string }> = [];
  nuevoSinEvolucionar: SinEvolucionarModel = new SinEvolucionarModel("", 0, 0, 0, "");

  constructor(sinEvolucionarServicio: SinEvolucionarService) {
    this.sinEvolucionarServicio = sinEvolucionarServicio;
  }

  async ngOnInit() {
    await this.cargarSinEvolucionar();
  }

  async cargarSinEvolucionar() {
    try {
      this.listaSinEvolucionar = await this.sinEvolucionarServicio.obtener();
    } catch (error) {
      console.error('Error al cargar pokémon para evolucionar:', error);
    }
  }

  async agregarSinEvolucionar() {
    try {
      await this.sinEvolucionarServicio.agregar(this.nuevoSinEvolucionar);
      this.nuevoSinEvolucionar = new SinEvolucionarModel("", 0, 0, 0, "");
      await this.cargarSinEvolucionar();
    } catch (error) {
      console.error('Error al agregar pokémon para evolucionar:', error);
    } 
  }

  async eliminarSinEvolucionar(id: string) {
    try {
      await this.sinEvolucionarServicio.eliminar(id);
      await this.cargarSinEvolucionar();
    } catch (error) {
      console.error('Error al eliminar pokémon para evolucionar:', error);
    }
  }

}

