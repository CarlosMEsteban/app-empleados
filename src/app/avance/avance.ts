import { Component } from '@angular/core';
import { AvanceService } from './avance.service';
import { AvanceModel } from './avance.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-avance',
  imports: [FormsModule],
  templateUrl: './avance.html',
  styleUrl: './avance.css'
})
export class Avance {
  private _saveTimers: Map<string, any> = new Map<string, any>();
  avanceServicio: AvanceService;
  bMostrarBotonesEspeciales: boolean = false;

  lAvances: AvanceModel[] = [];

  constructor(avanceServicio: AvanceService)
  {
    this.avanceServicio = avanceServicio;
    this.avanceServicio.todosAvance().then((avances) => {
      this.lAvances = avances;
      this.lAvances.sort((a, b) => b.fechaParaOrdenar() - a.fechaParaOrdenar());
    });
  }

  mostrarOcultarBotonesEspeciales()
  {
    this.bMostrarBotonesEspeciales = !this.bMostrarBotonesEspeciales;
  }

  cambiarCampoAvance(avance: AvanceModel, campo: string, valor: any) 
  {
    // el ngModel ya habrá actualizado avance, pero aseguramos el valor si hace falta:
    (avance as any)[campo] = valor;
    // debounce para evitar muchas peticiones seguidas
    const key = avance.id ?? JSON.stringify(avance);  
    if (this._saveTimers.has(key)) {
      clearTimeout(this._saveTimers.get(key));
    }
    this._saveTimers.set(key, setTimeout(async () => {
      try {
        // llama al servicio que persiste el avance (ajusta el método según tu servicio)
        if (this.avanceServicio && typeof this.avanceServicio.modificar === 'function') 
        {
          await this.avanceServicio.modificar(avance);
          console.log('avance guardado', avance.id);
        }
      } catch (err) {
        console.error('Error guardando avance', err);
      } finally {
        this._saveTimers.delete(key);
      }   
    }, 600)); // 600 ms debounce
  }

  crearAvances()
  {
    console.log("Crear Avances");  
    this.avanceServicio.crearAvancesIniciales();
  }

  ganancia(index: number | undefined): number
  {
    if (index === undefined) return 0;
    else if (index === this.lAvances.length) return 0;
    else
    {
      const avanceAnterior: AvanceModel = this.lAvances[index + 1];
      return this.lAvances[index].oro - avanceAnterior.oro;
    }
  }

  
}
