import { Component, Input } from '@angular/core';
import { ProductosDePedidoModel } from './productosDePedido.model';
import { FormsModule } from '@angular/forms';
import { ProductoModel } from '../producto/producto.model';
import { ProductoService } from '../producto/producto.service';

@Component({
  selector: 'app-productos-de-pedido',
  imports: [FormsModule],
  templateUrl: './productos-de-pedido.html',
  styleUrl: './productos-de-pedido.css'
})
export class ProductosDePedido {
  productosDePedido: any[] = [];
  todosLosProductos: ProductoModel[] = [];
  @Input() producto!: ProductosDePedidoModel;
  @Input() aaaa!: ProductosDePedidoModel;
  
  constructor(productoServicio: ProductoService){
    this.productosDePedido = [];
    productoServicio.listarProductos(new ProductoModel({})).then(lProductosDevueltos =>
            {
              console.log("lProductosDevueltos: " + lProductosDevueltos.length);
              this.todosLosProductos = lProductosDevueltos;
              console.log("lProductos1: " + this.todosLosProductos.length);
            }
            );

  }

}
