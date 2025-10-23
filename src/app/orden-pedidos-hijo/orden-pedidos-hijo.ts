import { Component, Input } from '@angular/core';
import { PedidoModel } from '../pedido/pedido.model';

@Component({
  selector: 'app-orden-pedidos-hijo',
  imports: [],
  templateUrl: './orden-pedidos-hijo.html',
  styleUrl: './orden-pedidos-hijo.css'
})
export class OrdenPedidosHijo 
{
  @Input() pedido!: PedidoModel;
  

}
