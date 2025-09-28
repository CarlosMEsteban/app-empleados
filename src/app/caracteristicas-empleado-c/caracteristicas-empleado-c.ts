import { Component, EventEmitter, Output } from '@angular/core';
import { ServicioEmpleados } from '../servicio-empleados';

@Component({
  selector: 'app-caracteristicas-empleado-c',
  imports: [],
  templateUrl: './caracteristicas-empleado-c.html',
  styleUrl: './caracteristicas-empleado-c.css'
})
export class CaracteristicasEmpleadoC {
  @Output() caracteristicasEmpleados = new EventEmitter<string>();

  constructor(private miServicio: ServicioEmpleados) { }

  agregarCaracteristica(nuevaCaracteristica: string) {
    this.miServicio.mostarMensaje("Característica del empleado: " + nuevaCaracteristica);
    this.caracteristicasEmpleados.emit(nuevaCaracteristica);
  }
}
