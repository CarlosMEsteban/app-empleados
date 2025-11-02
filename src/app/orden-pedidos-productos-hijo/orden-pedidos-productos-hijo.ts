import { Component, Input } from '@angular/core';
import { ProductosDePedidoModel } from '../productos-de-pedido/productosDePedido.model';

@Component({
  selector: 'app-orden-pedidos-productos-hijo',
  imports: [],
  templateUrl: './orden-pedidos-productos-hijo.html',
  styleUrl: './orden-pedidos-productos-hijo.css'
})
export class OrdenPedidosProductosHijo 
{
  @Input() productoDePedido!: ProductosDePedidoModel;

  claseSegunFalta(): string
  {
    if (this.productoDePedido == undefined)
      return "green";
    else
      if (this.productoDePedido.cantidad > this.productoDePedido.tengo)
        return "coral";
      else
        return "aliceblue";
  }
}
