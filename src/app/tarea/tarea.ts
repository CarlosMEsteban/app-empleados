import { Component } from '@angular/core';
import { TareaModel } from './tarea.model';
import { TareaService } from './tarea.service';
import { FormsModule } from '@angular/forms';
import { appConfig } from '../app.config';
import { TitleService } from '../services/title.service';


@Component({
  selector: 'app-tarea',
  imports: [FormsModule],
  templateUrl: './tarea.html',
  styleUrl: './tarea.css'
})
export class Tarea 
{
  private _saveTimers: Map<string, any> = new Map<string, any>();
  lTareas: TareaModel[] = [];
  

  bMostrarBotonesEspeciales: boolean = false;

  nuevaTarea: TareaModel = new TareaModel({bFija: false, hInicio: "", hDuracion: "", dTarea: "", aPara: ""});

  tareaServicio: TareaService;
  constructor(tareaServicio: TareaService, private titleServicio: TitleService) 
  {
    this.tareaServicio = tareaServicio;
    titleServicio.setTitle("Tareas");
    appConfig
  }
  

  ordenarTareas() 
  {
    console.log("Ordenar tareas");
    this.tareaServicio.obtenerTareas().then((tareas) =>   
    {
      this.lTareas = tareas.sort((a, b) => a.getHFInalNumero() - b.getHFInalNumero());
    }
    );
  }

  crearTareasFijas()
  {
    this.tareaServicio.agregarTareasFijas();
  }

  calcularHFinal(hInicio: string, hDuracion: string): string
  {
    const partesInicio = hInicio.split(':');
    const partesDuracion = hDuracion.split(':');

    const horasInicio = parseInt(partesInicio[0], 10);
    const minutosInicio = parseInt(partesInicio[1], 10);
    const horasDuracion = parseInt(partesDuracion[0], 10);
    const minutosDuracion = parseInt(partesDuracion[1], 10);

    let minutosFinal = horasInicio * 60 + minutosInicio + horasDuracion * 60 + minutosDuracion;
    const horasFinal = Math.floor(minutosFinal / 60);
    minutosFinal = minutosFinal % 60;

    let resultado = `${horasFinal}:${minutosFinal.toString().padStart(2, '0')}`;

    if (resultado.length == 4)
      resultado = "0" + resultado;
    return resultado;
  }

  calcularModifHFinal(tarea: TareaModel)
  {
    tarea.hFinal = this.calcularHFinal(tarea.hInicio, tarea.hDuracion);
    this.tareaServicio.modificarHoras(tarea.id!, tarea.hInicio, tarea.hDuracion, tarea.hFinal);
  }

  // TODO Pasar este método a TareaModel
  clasePara(aPara: string): string
  {
    switch (aPara.toUpperCase())  
    {
      case 'ABEJAS':
        return "input-bandas-v";
      case 'CHARCA':
        return 'charca';
      case 'TREN VECINDARIO':
        return 'trenVecindario';
      case 'TREN':
        return 'trenVecindario';
      case 'GREG':
        return 'greg';
      case "TOMMY":
        return 'tommy';
      case 'PASE':
        return 'pase';
      case 'BARCO':
        return 'barco';
      case 'VALLE':
        return 'valle';
      case 'DERBY':
        return 'derby';
      default:
        if (aPara.startsWith('80'))
          return 'feria'
        else
          return '';
    }
  }

  

  claseCantidades(cantidad: number): string
  {
    if (cantidad > 0)
    {
      return '';
    }
    else
    {
      return 'nada';
    }
  }

  hFinal(hora: String): string
  {
    if (hora < "08:00")
      return 'temprano';
    else if (hora >= "08:00" && hora < "15:15")
      return 'medio'; 
    else
      return 'tarde';
  }

  async agregarTarea()
  {
    this.encadenar(false);
  }

  cadena()
  {
    this.encadenar(true)
  }

  encadenar(bEncadenar: boolean)
  {
    let tareaAntigua = this.nuevaTarea.clonar();
    
    this.nuevaTarea.bFija = false;
    this.nuevaTarea.hFinal = this.calcularHFinal(this.nuevaTarea.hInicio, this.nuevaTarea.hDuracion);
    tareaAntigua.hInicio = this.calcularHFinal(this.nuevaTarea.hFinal, "00:01");
    if (tareaAntigua.nOrden > 0 )
      tareaAntigua.nOrden++;
    this.tareaServicio.insertarTarea(this.nuevaTarea).then((id) => 
    {
      this.nuevaTarea.id = id;
      this.lTareas.push(this.nuevaTarea);
      this.nuevaTarea = new TareaModel({bFija: false, hInicio: "", hDuracion: "", dTarea: "", aPara: ""});
      this.ordenarTareas();
      if (bEncadenar)
        this.nuevaTarea = tareaAntigua;
      

    });    
    
  }

  eliminar(id: string)
  {
    this.tareaServicio.eliminarTarea(id).then(() => 
    {
      this.lTareas = this.lTareas.filter(tarea => tarea.id !== id); // Actualiza la lista local después de eliminar
    });
  }

  onTareaChanged(tarea: TareaModel, campo: string, valor: any) {
    // el ngModel ya habrá actualizado tarea, pero aseguramos el valor si hace falta:
    (tarea as any)[campo] = valor;

    // recalcula hFinal si cambia inicio o duración
    if (campo === 'hInicio' || campo === 'hDuracion') {
      this.calcularModifHFinal(tarea);
    }

    // debounce para evitar muchas peticiones seguidas
    const key = tarea.id ?? JSON.stringify(tarea);
    if (this._saveTimers.has(key)) {
      clearTimeout(this._saveTimers.get(key));
    }
    this._saveTimers.set(key, setTimeout(async () => {
      try {
        // llama al servicio que persiste la tarea (ajusta el método según tu servicio)
        if (this.tareaServicio && typeof this.tareaServicio.modificarTarea === 'function') {
          await this.tareaServicio.modificarTarea(tarea);
          console.log('Tarea guardada', tarea.id);
        }
      } catch (err) {
        console.error('Error guardando tarea', err);
      } finally {
        this._saveTimers.delete(key);
      }
    }, 600)); // 600 ms debounce
  }

  mostrarBotonesEspeciales()
  {
    this.bMostrarBotonesEspeciales = !this.bMostrarBotonesEspeciales;
  }




}
