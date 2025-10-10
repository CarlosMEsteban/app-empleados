import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioEmpleados {
  constructor() { }
  mostarMensaje(mensaje: string){
  //  alert('->' + mensaje);
  }
}
