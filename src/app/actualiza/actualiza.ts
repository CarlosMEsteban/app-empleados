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
  accion: String = '';

  constructor(private route: ActivatedRoute, private router: Router, private empleadosService: EmpleadosService) {
    this.empleados = this.empleadosService.empleados; 
    this.indice = this.route.snapshot.params['id'];
    this.empleadoDetalle = this.empleadosService.encontrarEmpleado(this.indice);
    this.accion = this.route.snapshot.queryParams['accion'];

  }
  
  

  guardarEmpleado() {
    if (this.accion == 'M') {
      this.empleadosService.modificarEmpleadoServicio(this.empleadoDetalle);    
    }
    else if (this.accion == 'E') {
      this.empleadosService.eliminarEmpleado(this.indice);    
    }

    this.router.navigate(['']);
  }

}
