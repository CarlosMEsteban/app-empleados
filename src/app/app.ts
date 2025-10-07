import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { Empleado } from './empleado.model';
import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { EmpleadoHijoC } from "./empleado-hijo-c/empleado-hijo-c";
import { ServicioEmpleados } from './servicio-empleados';
import { EmpleadosService } from './empleados.service';
import { Home } from './home/home';
import { Contacto } from './contacto/contacto';
import { Proyectos } from './proyectos/proyectos';
import { QuienesSomos } from './quienes-somos/quienes-somos';
import { HomeComponent } from './home-component/home-component';
import { ProyectosComponent } from './proyectos-component/proyectos-component';
import { ContactoComponent } from './contacto-component/contacto-component';
import { QuienesComponent } from './quienes-component/quienes-component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { anadirEmpleado, db, getEmpleados, quitarEmpleado } from './DataServices.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
            FormsModule, 
            NgFor, 
            NgIf, HttpClientModule       
            ],
  templateUrl: './app.html',
  styleUrl: './app.css'  
})
export class App {
  
  


  protected operacion = "";
  readonly alta = "A";
  readonly editar = "E";

  empleados: Empleado[] = []

  constructor(private miServicio: ServicioEmpleados, private empleadosService: EmpleadosService) 
  {
    console.log("App component cargado.");
    
     this.empleados = this.empleadosService.empleados;
   }

  

  nuevoEmpleado: Empleado = new Empleado("", "", "", 0);

  altaEmpleado() {
    this.operacion = "A";
    this.nuevoEmpleado = new Empleado("Añadido desde ANGULAR", "EFEWDF", "EQFEF", 0);
anadirEmpleado(this.nuevoEmpleado, db);
    getEmpleados(db);
  }

  guardarEmpleado() {
    if (this.operacion == this.alta) {
      this.agregarEmpleado(this.nuevoEmpleado);
      this.nuevoEmpleado = new Empleado("", "", "", 0);
      this.operacion = "";
    } else if (this.operacion == this.editar) {
      // Aquí se podría implementar la lógica para guardar los cambios en un empleado existente
      this.modificarEmpleado(this.nuevoEmpleado);
      this.operacion = "";
      this.nuevoEmpleado = new Empleado("", "", "", 0);
    }
  }

  modificarEmpleado(empleado: Empleado) {
    let indice = this.empleadosService.empleados.findIndex(e => e.nombre === empleado.nombre && e.apellido === empleado.apellido); 
    if (indice !== -1) {
      this.empleadosService.empleados[indice] = empleado;
    }
  }

  cancelar() {
    this.operacion = "";
    this.nuevoEmpleado = new Empleado("", "", "", 0);
  }

  editarEmpleado(indice: number) {
    console.log(indice);
    this.operacion = "E";
    this.nuevoEmpleado = this.empleadosService.empleados[indice];
    
  }

  eliminarEmpleado(indice: number) {
    this.empleadosService.eliminarEmpleado(indice);
    this.operacion = "";
  }


  bAlta(): boolean {
    return this.operacion == this.alta;
  }
  bModif(): boolean {
    return this.operacion == this.editar;
  }
numeroAleatorio: number = 0;
nuevoNombre: string = "";
nuevoApellido: string = "";
  agregarEmpleado(empleado: Empleado) {
    console.error("Hola.");
    this.miServicio.mostarMensaje("Alta de empleado: " + empleado.nombre + " " + empleado.apellido);

this.empleadosService.agregarEmpleado(empleado); 
getEmpleados(db);   
console.log("Vamos a eliminar un empleado fijo.");
quitarEmpleado("KZyALec7pOPDpKRWj3tL");
console.log("Vamos a modificar nombre y apellidos");

    
    
  }

  bMostrarDetalle(): boolean {
    return this.bAlta() || this.bModif();
  }

}
function cambiarEmpleado(arg0: string, arg1: { nombre: string; apellido: string; }) {
  throw new Error('Function not implemented.');
}

