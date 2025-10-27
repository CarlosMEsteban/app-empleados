import { Component, Input } from '@angular/core';
import { PedidoModel } from '../pedido/pedido.model';
import { OrdenPedidosProductosHijo } from '../orden-pedidos-productos-hijo/orden-pedidos-productos-hijo';
import { ProductosDePedidoModel } from '../productos-de-pedido/productosDePedido.model';
import { ProductoDePedidoService } from '../producto-de-pedido/producto-de-pedido.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-orden-pedidos-hijo',
  imports: [OrdenPedidosProductosHijo, NgFor],
  templateUrl: './orden-pedidos-hijo.html',
  styleUrl: './orden-pedidos-hijo.css'
})
export class OrdenPedidosHijo 
{
  @Input() pedido!: PedidoModel;

  lProductosDePedido: ProductosDePedidoModel[] = [];

  productoDePedidoServicio: ProductoDePedidoService;

  constructor(productoDePedidoServicio: ProductoDePedidoService)
  {
    this.productoDePedidoServicio = productoDePedidoServicio;

  }

  ngOnInit()
  { 
    console.clear();
    if (this.pedido?.id)
      this.cargarProductosDePedido();
  }


  private async cargarProductosDePedido(): Promise<void> 
  {

    if (!this.pedido?.id) {
      this.lProductosDePedido = [];
      return;
    }
    try {
      this.lProductosDePedido = await this.productoDePedidoServicio.obtenerProductosDePedidoPorPedidoId(this.pedido.id);
      // opcional: asignar pedidoId a cada productoDePedido si hace falta
      this.lProductosDePedido.forEach(p => (p.pedidoId = this.pedido.id));
    } catch (err) {
      console.error('Error cargando productos del pedido', err);
      this.lProductosDePedido = [];
    }

    console.log("Pedido: " + this.pedido.id+ " tiene "+  this.lProductosDePedido.length + " productos")
 }
}
