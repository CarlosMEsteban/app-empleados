import { Component, Input } from '@angular/core';
import { ProductosDePedidoModel } from './productosDePedido.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos-de-pedido',
  imports: [FormsModule],
  templateUrl: './productos-de-pedido.html',
  styleUrl: './productos-de-pedido.css'
})
export class ProductosDePedido {
  productosDePedido: any[] = [];
  @Input() producto!: ProductosDePedidoModel;
  @Input() aaaa!: ProductosDePedidoModel;
  
  constructor(){
    this.productosDePedido = [];
  }

}
