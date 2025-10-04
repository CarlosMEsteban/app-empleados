import { Injectable } from '@angular/core';
import { Empleado, empleadoConverter } from './empleado.model';
//import { DataServicesService } from './DataServices.service';
import { getCities, db, anadirEmpleado } from './DataServices.service';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

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

  /*constructor(private dataServicio: DataServicesService) { }*/

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
    //guardarEmpleado(empleado, db);

// 3. How to use it to add a document to Firestore
const db = getFirestore();
const empleadosCollectionRef = collection(db, 'empleados').withConverter(empleadoConverter);

async function agregarNuevoEmpleado() {
  const nuevoEmpleado = new Empleado(
                              'Juan',
                              'Pérez',
                              'Desarrollador Senior',
                              12
  );

  try {
    //const docRef = await addDoc(empleadosCollectionRef, nuevoEmpleado);
    const docRef = await anadirEmpleado(nuevoEmpleado, db);    
    console.log("Documento escrito con ID:");
  } catch (e) {
    console.error("Error al agregar documento: ", e);
  }
}    
    
    //this.dataServicio.guardarEmpleados(this.empleados)
    /*.subscribe(
      response => console.log("Se ha guardado correctamente"),
      error => console.log("Error al guardar: " + error)
    );*/
  }

  encontrarEmpleado(indice: number): Empleado {


    return this.empleados[indice];
  }


}
