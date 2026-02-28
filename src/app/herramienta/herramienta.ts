import { Component } from '@angular/core';
import { HerramientaService } from './herramienta.service';
import { HerramientaModel } from './herramienta.model';
import { FormsModule } from '@angular/forms';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-herramienta',
  imports: [FormsModule],
  templateUrl: './herramienta.html',
  styleUrl: './herramienta.css'
})
export class Herramienta 
{
  private _saveTimers: Map<string, any> = new Map<string, any>();
  herramientaServicio: HerramientaService;
  bMostrarBotonesEspeciales: boolean = false;

  lHerramientas: HerramientaModel[] = [];

  constructor(herramientaServicio: HerramientaService, private titleServicio: TitleService)
  {
    titleServicio.setTitle("Herramientas");
    this.herramientaServicio = herramientaServicio;
    this.herramientaServicio.listarHerramients().then((herramientas) => {
      this.lHerramientas = herramientas;
      herramientas.sort((a, b) => a.nombre.localeCompare(b.nombre));
    });
  }

  
  crearHerramientas()
  {
    console.log("Crear Herramientas");  
    this.herramientaServicio.crearHerramientas();
  }

  cambiarCampoHerramienta(herramienta: HerramientaModel, campo: string, valor: any) 
  {
    // el ngModel ya habrá actualizado herramienta, pero aseguramos el valor si hace falta:
    (herramienta as any)[campo] = valor;

    // debounce para evitar muchas peticiones seguidas
    const key = herramienta.id ?? JSON.stringify(herramienta);
    if (this._saveTimers.has(key)) {
      clearTimeout(this._saveTimers.get(key));
    }
    this._saveTimers.set(key, setTimeout(async () => {
      try {
        // llama al servicio que persiste la herramienta (ajusta el método según tu servicio)
        if (this.herramientaServicio && typeof this.herramientaServicio.modificar === 'function') 
        {
          await this.herramientaServicio.modificar(herramienta);
          //console.log('herramienta guardada', herramienta.id, herramienta.nombre, campo, valor);
        }
      } catch (err) {
        console.error('Error guardando herramienta', err);
      } finally {
        this._saveTimers.delete(key);
      }
    }, 600)); // 600 ms debounce
  }

  
  mostrarOcultarBotonesEspeciales()
  {
    this.bMostrarBotonesEspeciales = !this.bMostrarBotonesEspeciales;
  }

  faltaOSobra(campo: string): string
  {
    let totalNecesario = 0;
    let tengo = 0;
    for (let herramienta of this.lHerramientas) 
    {
      if ((herramienta as any)[campo] > 0)
      {
        if ((herramienta as any)["tengo"] > (herramienta as any)[campo])
          tengo += (herramienta as any)[campo] ?? 0;
        else      
         tengo += herramienta.tengo ?? 0;
      }  
      totalNecesario += (herramienta as any)[campo] ?? 0;
    }
    //return "Tengo " + tengo + ", necesito " + totalNecesario + ", me " + (tengo - totalNecesario < 0 ? "falta" : "sobra") + " " + Math.abs(tengo - totalNecesario);
console.log("Campo: " + campo + ". Tengo: " + tengo + ". Necesito: " + totalNecesario);
    if (totalNecesario - tengo  <= 0)
      return "";
    else
      return "(" + tengo + "-" + totalNecesario + "=" + (tengo - totalNecesario) + ")";
  }
}
