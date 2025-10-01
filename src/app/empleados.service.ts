import { Injectable } from '@angular/core';
import { Empleado } from './empleado.model';
import { DataServicesService } from './DataServices.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
empleados: Empleado[] = [
    new Empleado("Carlos", "García", "Presidente", 75000),
    new Empleado("Ana", "Martínez", "Directora", 55000),
    new Empleado("Lucía", "López", "Jefa de Sección", 35000),
    new Empleado("Pedro", "Gómez", "Programador", 25000),
    new Empleado("María", "Díaz", "Diseñadora", 27000),
    new Empleado("Sergio", "Sánchez", "Programador", 24000),
    new Empleado("Laura", "Pérez", "Diseñadora", 26000)
  ];  

  constructor(private dataServicio: DataServicesService) { }

  modificarEmpleadoServicio(empleado: Empleado) {
    let indice = this.empleados.findIndex(e => e.nombre === empleado.nombre && e.apellido === empleado.apellido); 
    if (indice !== -1) {
      this.empleados[indice] = empleado;
    }
  }  

  eliminarEmpleado(indice: number) {
    this.empleados.splice(indice, 1);
  }

  agregarEmpleado(empleado: Empleado) {
    this.empleados.push(empleado);    
    this.dataServicio.guardarEmpleados(this.empleados);
  }

  encontrarEmpleado(indice: number): Empleado {
    return this.empleados[indice];
  }


}
