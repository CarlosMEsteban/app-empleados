import { Component, Input } from '@angular/core';
import { PedidoModel } from '../pedido/pedido.model';
import { OrdenPedidosProductosHijo } from '../orden-pedidos-productos-hijo/orden-pedidos-productos-hijo';
import { ProductosDePedidoModel } from '../productos-de-pedido/productosDePedido.model';
import { ProductoDePedidoService } from '../producto-de-pedido/producto-de-pedido.service';
import { NgFor } from '@angular/common';
import { ProductoService } from '../producto/producto.service';
import { ProductoModel } from '../producto/producto.model';

@Component({
  selector: 'app-orden-pedidos-hijo',
  imports: [OrdenPedidosProductosHijo, NgFor],
  templateUrl: './orden-pedidos-hijo.html',
  styleUrl: './orden-pedidos-hijo.css'
})
export class OrdenPedidosHijo 
{
  @Input() pedido!: PedidoModel;
  @Input() lProductos!: ProductoModel[];

  lProductosDePedido: ProductosDePedidoModel[] = [];

  productoDePedidoServicio: ProductoDePedidoService;
  productoServicio: ProductoService;

  constructor(productoDePedidoServicio: ProductoDePedidoService, productoServicio: ProductoService)
  {
    this.productoDePedidoServicio = productoDePedidoServicio;
    this.productoServicio = productoServicio;
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
      // A cada producto le ponemos su nombre de producto
      this.lProductosDePedido.forEach(pdp =>{
        let producto = this.lProductos.find(p => p.cProductoId == pdp.poductoId);
        if (producto == undefined)
          pdp.nombreProducto = "Nombre de producto no encontrado";
        else
        {
          pdp.nombreProducto = producto.nombre;
          pdp.tengo = producto.tengo;
        }
      })
      
    } catch (err) {
      console.error('Error cargando productos del pedido', err);
      this.lProductosDePedido = [];
    }

    console.log("Pedido: " + this.pedido.id+ " tiene "+  this.lProductosDePedido.length + " productos")
 }

 
}
