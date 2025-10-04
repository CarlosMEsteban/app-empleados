import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { Empleado } from '../empleado.model';
import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { EmpleadoHijoC } from "../empleado-hijo-c/empleado-hijo-c";
import { ServicioEmpleados } from '../servicio-empleados';
import { EmpleadosService } from '../empleados.service';

import { Contacto } from '../contacto/contacto';
import { Proyectos } from '../proyectos/proyectos';
import { QuienesSomos } from '../quienes-somos/quienes-somos';
import { anadirEmpleado, cambiarEmpleado, db, getEmpleados, quitarEmpleado } from '../DataServices.service';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, FormsModule, NgFor, NgIf, EmpleadoHijoC],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected title = 'Listado de empleados';
  
  empleados: Empleado[] = [];
  protected operacion = "";
  readonly alta = "A";
  readonly editar = "E";
  nuevoEmpleado: Empleado = new Empleado("", "", "", 0);

  constructor(private miServicio: ServicioEmpleados, private empleadosService: EmpleadosService) {
    this.empleados = this.empleadosService.empleados;
    console.log("ldwsjngvrhbgh");
   }

  

  altaEmpleado() {
    this.operacion = "A";
    this.nuevoEmpleado = new Empleado("", "", "", 0);
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
nuevoNombreInsert: string = "";
nuevoApellidoInsert: string = "";
nuevoNombreModif: string = "";
nuevoApellidoModif: string = "";

  agregarEmpleado(empleado: Empleado) {
      console.error("Vamos a llamar a getEmpleados");
this.numeroAleatorio = Math.floor(Math.random() * 1000);
this.nuevoNombreInsert = "Insertado desde Angular " + this.numeroAleatorio;
this.nuevoApellidoInsert = "Insertado desde Angular " + this.numeroAleatorio;
anadirEmpleado(new Empleado(this.nuevoNombreInsert, this.nuevoApellidoInsert, "Carguete", 1), db);      
    getEmpleados(db);

    this.miServicio.mostarMensaje("Alta de empleado: " + empleado.nombre + " " + empleado.apellido);
    this.empleadosService.agregarEmpleado(empleado);    

console.log("Vamos a eliminar un empleado fijo.");
quitarEmpleado("KZyALec7pOPDpKRWj3tL");


this.nuevoNombreModif = "Modificado desde Angular " + this.numeroAleatorio;
this.nuevoApellidoModif = "Modificado desde Angular " + this.numeroAleatorio;
cambiarEmpleado("JRBgs4F5W0xhBDH6NCWs", {nombre: this.nuevoNombreModif, apellido: this.nuevoApellidoModif});


  }

  bMostrarDetalle(): boolean {
    return this.bAlta() || this.bModif();
  }

}
