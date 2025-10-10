import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProductoModel } from './producto.model';
import { ProductoService } from './producto.service';
import { ProductoHijo } from '../producto-hijo/producto-hijo';

@Component({
  selector: 'app-producto',
  imports: [ProductoHijo, NgFor],
  templateUrl: './producto.html',
  styleUrl: './producto.css'
})
export class Producto {
  productoService: ProductoService;

  lProductos : ProductoModel[] = [];
  constructor(productoService: ProductoService)
  { 
    this.productoService = productoService;
  }

  

  anadirProducto()
  {
      /*const nuevoProducto = new ProductoModel(
          999,
          "Prueba",
          1,
          2,
          "Alamacenenro",
          false,
          3,
          "Fabric"
      );*/
      const nuevoProducto2 = new ProductoModel(
        {
          "id": 999,
          "nombre": "Prueba",
          "coste": 1,
          "tengo": 2,
          "almacen": "Alamacenenro",
          "materiaPrima": "N",
          "cantidadInicial": 3,
          "fabrica": "Fabric"
        }
      )
      const nuevoProducto = new ProductoModel(
        {
          "id": 999,
          "nombre": "Prueba",
          "coste": 5,
          "tengo": 2,
          "almacen": "Alamacenenro",
          "materiaPrima": "S",
          "cantidadInicial": 3,
          "fabrica": "Fabric"
        }
      )

  

//constructor(id: number = -1, 
// nombre: string, 
// coste: number, 
// tengo: number, 
// almacen: string, 
// materiaPrima: boolean, 
// cantidadInicial: number, 
// fabrica: string )           
    this.productoService.agregarService(nuevoProducto);
  }

  cargarTodosProdutos()
  {

    this.productoService.cargarTodosProdutos();
  }

  listarProductos()
  {
   this.productoService.listarProductos(new ProductoModel({})).then(lProductosDevueltos =>
            {
              console.log("lProductosDevueltos: " + lProductosDevueltos.length);
              this.lProductos = lProductosDevueltos;
              console.log("lProductos1: " + this.lProductos.length);
            }
            );
    console.log("lProductos2: " + this.lProductos.length);
  }
      
}
