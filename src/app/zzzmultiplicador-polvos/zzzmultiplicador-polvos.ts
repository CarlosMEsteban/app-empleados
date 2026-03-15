import { Component } from '@angular/core';
import { MultiplicadorPolvosService } from './zzzmultiplicador-polvos.service';

@Component({
  selector: 'app-zzzmultiplicador-polvos',
  imports: [],
  templateUrl: './zzzmultiplicador-polvos.html',
  styleUrl: './zzzmultiplicador-polvos.css'
})
export class ZzzmultiplicadorPolvos {
 multiplicadorPolvosServicio: MultiplicadorPolvosService;
    constructor(multiplicadorPolvosServicio: MultiplicadorPolvosService) {
      this.multiplicadorPolvosServicio = multiplicadorPolvosServicio;
    }
  async cargarMultiplicadores() {
    // Aquí puedes implementar la lógica para cargar los mejores ataques desde un archivo CSV
    console.log("Cargando multiplicadores de polvos desde CSV...");
try {
      await this.multiplicadorPolvosServicio.cargarMultiplicadoresIniciales();
    } catch (error) {
      console.error('Error al cargar multiplicadores de polvos:', error);
      alert('Error al cargar multiplicadores de polvos.');
    }    
  }
}
