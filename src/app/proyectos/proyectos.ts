import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from '../empleado.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proyectos',
  imports: [FormsModule],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.css'
})
export class Proyectos {
  nuevoEmpleado: Empleado = new Empleado('', '', '', 0);

  constructor(private router: Router) {


  }
  volver() {
    this.router.navigate(['']);
  }

  guardarEmpleado() {

  }
}
