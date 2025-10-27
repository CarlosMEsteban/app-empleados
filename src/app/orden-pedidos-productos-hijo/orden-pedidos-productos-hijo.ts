import { Component, Input } from '@angular/core';
import { ProductosDePedidoModel } from '../productos-de-pedido/productosDePedido.model';
import { PedidoModel } from '../pedido/pedido.model';

@Component({
  selector: 'app-orden-pedidos-productos-hijo',
  imports: [],
  templateUrl: './orden-pedidos-productos-hijo.html',
  styleUrl: './orden-pedidos-productos-hijo.css'
})
export class OrdenPedidosProductosHijo 
{
  @Input() productoDePedido!: ProductosDePedidoModel;


}
