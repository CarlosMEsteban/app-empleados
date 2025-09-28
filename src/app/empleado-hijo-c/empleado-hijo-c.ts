import { Component, Input } from '@angular/core';
import { Empleado } from '../empleado.model';
import { CaracteristicasEmpleadoC } from "../caracteristicas-empleado-c/caracteristicas-empleado-c";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleado-hijo-c',  
  imports: [CaracteristicasEmpleadoC, FormsModule, CommonModule],
  templateUrl: './empleado-hijo-c.html',
  styleUrl: './empleado-hijo-c.css'
})
export class EmpleadoHijoC  {
  @Input() empleadoDeLista!: Empleado;
  @Input() indice!: number;


  arrayCaracteristicas: string[] = [];

  agregarCaracteristica(nuevaCaracteristica: string) {
    this.arrayCaracteristicas.push(nuevaCaracteristica);
  }
}
