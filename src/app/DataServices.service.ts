import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from './empleado.model';

@Injectable()
export class DataServicesService {

constructor(private httpCliente : HttpClient) { }

guardarEmpleados(empleados : Empleado[]){
  this.httpCliente.post('https://empleadosapp-6f5f4-default-rtdb.firebaseio.com/datos.json', empleados) 
}
}
