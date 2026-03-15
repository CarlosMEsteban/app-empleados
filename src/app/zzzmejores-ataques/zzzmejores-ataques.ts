import { Component } from '@angular/core';
import {MejoresAtaquesService} from './mejores-ataques.service';

@Component({
  selector: 'app-zzzmejores-ataques',
  imports: [],
  templateUrl: './zzzmejores-ataques.html',
  styleUrl: './zzzmejores-ataques.css'
})
export class ZzzmejoresAtaques 
{
  mejoresAtaquesServicio: MejoresAtaquesService;
  constructor(mejoresAtaquesServicio: MejoresAtaquesService) {
    this.mejoresAtaquesServicio = mejoresAtaquesServicio;
  }
  async cargarMejoresAtaques() {
    // Aquí puedes implementar la lógica para cargar los mejores ataques desde un archivo CSV
    console.log("Cargando mejores ataques desde CSV...");
try {
      await this.mejoresAtaquesServicio.cargarMejoresAtaquesIniciales();
    } catch (error) {
      console.error('Error al cargar mejoresataques:', error);
      alert('Error al cargar mejores ataques.');
    }    
  }
}
