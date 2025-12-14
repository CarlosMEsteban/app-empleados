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
          console.log('herramienta guardada', herramienta.id);
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

}
