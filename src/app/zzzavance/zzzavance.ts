import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Component } from '@angular/core';
import { AvancePokemonGoService } from './zzzavance.service';
import { avancePokemonGoModel } from './zzzavance.model';
import { Fechas } from '../util/fechas';

@Component({
  selector: 'app-zzzavance',
  imports: [FormsModule, NgFor, NgIf, CommonModule],
  templateUrl: './zzzavance.html',
  styleUrl: './zzzavance.css'
})
export class Zzzavance {
  avanceServico: AvancePokemonGoService;
  listaAvances: Array<avancePokemonGoModel & { id: string }> = [];
  nuevoAvance: avancePokemonGoModel = new avancePokemonGoModel('', '', 0, 0);

  constructor(avanceServico: AvancePokemonGoService) {
    this.avanceServico = avanceServico;
  }

  async ngOnInit() {
    await this.cargarAvances();
  }

  async cargarAvances() {
    try {
      this.listaAvances = await this.avanceServico.obtener();
      this.listaAvances.sort((a, b) => { return b.pxIniciales - a.pxIniciales });
    } catch (error) {
      console.error('Error al cargar avances:', error);
    }
  }

  async agregarAvance() {
    try {
      this.nuevoAvance.fecha = Fechas.aFormatoEspanol(this.nuevoAvance.fecha);
      await this.avanceServico.agregar(this.nuevoAvance);
      this.nuevoAvance = new avancePokemonGoModel('', '', 0, 0);
      await this.cargarAvances();
    } catch (error) {
      console.error('Error al agregar avance:', error);
    } 
  }

  async eliminarAvance(id: string) {
    try {
      await this.avanceServico.eliminar(id);
      await this.cargarAvances();
    } catch (error) {
      console.error('Error al eliminar avance:', error);
    }
  }




}
