import { Component } from '@angular/core';
import { ProductoModel } from './producto.model';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-producto',
  imports: [],
  templateUrl: './producto.html',
  styleUrl: './producto.css'
})
export class Producto {
  productoService: ProductoService;
  constructor(productoService: ProductoService)
  { 
    this.productoService = productoService;
  }

  cargarProductos()
  {
      const nuevoProducto = new ProductoModel(
          999,
          "Prueba",
          1,
          2,
          "Alamacenenro",
          false,
          3,
          "Fabric"
      );
    this.productoService.agregarService(nuevoProducto);
  }


      
}
