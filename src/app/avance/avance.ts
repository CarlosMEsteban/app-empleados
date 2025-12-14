import { Component } from '@angular/core';
import { AvanceService } from './avance.service';
import { AvanceModel } from './avance.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-avance',
  imports: [FormsModule, CommonModule],
  templateUrl: './avance.html',
  styleUrl: './avance.css'
})
export class Avance {
  private _saveTimers: Map<string, any> = new Map<string, any>();
  avanceServicio: AvanceService;
  bMostrarBotonesEspeciales: boolean = false;

  nuevoAvance: AvanceModel = new AvanceModel({fecha: ""});
  lAvances: AvanceModel[] = [];

  constructor(avanceServicio: AvanceService, 
              private titleServicio: TitleService)
  {
    titleServicio.setTitle("Gestión de Avances");
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

  ganancia(index: number | undefined): String
  {
    if (index === undefined) return "";
    else if (index === this.lAvances.length) return "";
    else
    {
      const avanceAnterior: AvanceModel = this.lAvances[index + 1];
      if (avanceAnterior === undefined) 
        return "";
      else
      {
        let ganancia = this.lAvances[index].oro - avanceAnterior.oro;
        return  new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(ganancia);
      }
    }
  }

  agregarAvance()
  {
    this.avanceServicio.insertarAvance(this.nuevoAvance).then((id) => 
    {
      this.nuevoAvance.id = id ?? undefined;
      this.lAvances.push(this.nuevoAvance);
      this.nuevoAvance = new AvanceModel({fecha: "", oro: -1, estrellas: -1, estrellasObjetivo: -1});
      
    });
  }

  eliminar(id: string)
  {
    this.avanceServicio.eliminarAvance(id).then(() => 
    {
      this.lAvances = this.lAvances.filter(avance => avance.id !== id); // Actualiza la lista local después de eliminar
    });
  }
  
}
