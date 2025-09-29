import { Component } from '@angular/core';
import { Empleado } from '../empleado.model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EmpleadosService } from '../empleados.service';

@Component({
  selector: 'app-actualiza',
  imports: [FormsModule],
  templateUrl: './actualiza.html',
  styleUrl: './actualiza.css'
})
export class Actualiza {
  empleadoDetalle: Empleado = new Empleado('','','',0);
  indice: number = -1;
  empleados: Empleado[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private empleadosService: EmpleadosService) {
    this.empleados = this.empleadosService.empleados; 
    this.indice = this.route.snapshot.params['id'];
    this.empleadoDetalle = this.empleadosService.encontrarEmpleado(this.indice);

  }
  
  

  guardarEmpleado() {
    this.empleadosService.modificarEmpleadoServicio(this.empleadoDetalle);    
    this.router.navigate(['']);
  }

}
