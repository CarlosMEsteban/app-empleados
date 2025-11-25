import { Component } from '@angular/core';
import { TareaModel } from './tarea.model';
import { TareaService } from './tarea.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tarea',
  imports: [FormsModule],
  templateUrl: './tarea.html',
  styleUrl: './tarea.css'
})
export class Tarea 
{
  lTareas: TareaModel[] = [];

  nuevaTarea: TareaModel = new TareaModel({bFija: false, hInicio: "", hDuracion: "", dTarea: "", aPara: ""});

  tareaServicio: TareaService;
  constructor(tareaServicio: TareaService) 
  {
    this.tareaServicio = tareaServicio;
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

  clasePara(aPara: string): string
  {
    switch (aPara)  
    {
      case 'abejas':
        return "input-bandas-v";
      case 'charca':
        return 'charca';
      case 'tren vecindario':
        return 'trenVecindario';
      case 'tren':
        return 'trenVecindario';
      case 'Greg':
        return 'greg';
      case "Tommy":
        return 'tommy';
      case 'pase':
        return 'pase';
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

  agregarTarea()
  {
    this.nuevaTarea.bFija = false;
    this.nuevaTarea.hFinal = this.calcularHFinal(this.nuevaTarea.hInicio, this.nuevaTarea.hDuracion);
    this.tareaServicio.insertarTarea(this.nuevaTarea).then((id) => 
    {
      this.nuevaTarea.id = id;
      this.lTareas.push(this.nuevaTarea);
      this.nuevaTarea = new TareaModel({bFija: false, hInicio: "", hDuracion: "", dTarea: "", aPara: ""});
      this.ordenarTareas();
      
    });
  }

  eliminar(id: string)
  {
    this.tareaServicio.eliminarTarea(id).then(() => 
    {
      this.lTareas = this.lTareas.filter(tarea => tarea.id !== id); // Actualiza la lista local después de eliminar
    });
  }
}
