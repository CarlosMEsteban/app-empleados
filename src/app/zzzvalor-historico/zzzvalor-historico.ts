import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Component } from '@angular/core';
import { valorHistoricoService } from './zzzvalorHistorico.service';
import { valorHistoricoModel } from './zzzvalorHistorico.model';
import { Fechas } from '../util/fechas';
import { MisPokemonService } from '../zzzmis-pokemon/zzzmis-pokemon.service';



@Component({
  selector: 'app-zzzvalor-historico',
  imports: [FormsModule, NgFor, NgIf, CommonModule],
  templateUrl: './zzzvalor-historico.html',
  styleUrl: './zzzvalor-historico.css'
})
export class ZzzvalorHistorico {
  valorHistoricoServicio: valorHistoricoService;
  misPokemonServicio: MisPokemonService;
  listaValorHistorico: Array<valorHistoricoModel & { id: string }> = [];
  nuevoAvance: valorHistoricoModel = new valorHistoricoModel('', 0);
  fechas = Fechas;

  constructor(valorHistoricoServicio: valorHistoricoService, misPokemonServicio: MisPokemonService) {
    this.valorHistoricoServicio = valorHistoricoServicio;
    this.misPokemonServicio = misPokemonServicio;
  }

  async ngOnInit() {
    await this.cargarValorHistorico();
    let hoy = this.fechas.obtenerFechaActual();
    let enc = this.listaValorHistorico.findIndex(vh => vh.fecha == hoy);
    if (enc == -1) {
      let valorMedio = await this.misPokemonServicio.obtenerValorMedio();
      await this.valorHistoricoServicio.agregar(hoy, valorMedio);
      await this.cargarValorHistorico();
    }
  }

  async cargarValorHistorico() {
    try {
      this.listaValorHistorico = await this.valorHistoricoServicio.obtener();

      this.listaValorHistorico.sort((a, b) => {
        const fechaA = this.fechas.parsearFecha(a.fecha);
        const fechaB = this.fechas.parsearFecha(b.fecha);
        return fechaB.getTime() - fechaA.getTime();
      });

    } catch (error) {
      console.error('Error al cargar valores históricos:', error);
    }
  }
}
