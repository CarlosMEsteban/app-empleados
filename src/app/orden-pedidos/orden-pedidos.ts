import { Component } from '@angular/core';
import { PedidoService } from '../pedido/pedido-service';
import { ProductoService } from '../producto/producto.service';
import { PedidoModel } from '../pedido/pedido.model';
import { ProductoModel } from '../producto/producto.model';
import { ProductoDePedidoService } from '../producto-de-pedido/producto-de-pedido.service';
import { ProductosDePedidoModel } from '../productos-de-pedido/productosDePedido.model';
import { IngredienteService } from '../ingrediente/ingrediente-service';

@Component({
  selector: 'app-orden-pedidos',
  imports: [],
  templateUrl: './orden-pedidos.html',
  styleUrl: './orden-pedidos.css'
})
export class OrdenPedidos 
{
  pedidoServicio: PedidoService;
  productoServicio: ProductoService;
  productosDePedidoServicio: ProductoDePedidoService;
  IngredienteServicio: IngredienteService;

  pedidos: PedidoModel[] = [];
  productos: ProductoModel[] = [];
  productosDePedido: ProductosDePedidoModel[] = [];


  constructor(pedidoServicio: PedidoService, 
              productoServicio: ProductoService,
              productosDePedidoServicio: ProductoDePedidoService,
            IngredienteServicio: IngredienteService) 
  {
    this.pedidoServicio = pedidoServicio;
    this.productoServicio = productoServicio;
    this.productosDePedidoServicio = productosDePedidoServicio;
    this.IngredienteServicio = IngredienteServicio;
    this.calcularOrdenPedidos();
  }

  async calcularOrdenPedidos()
  {
    console.clear();
    this.obtenerTodosLosDatos();



  }

  private async obtenerTodosLosDatos()
  {
    console.log("Empezamos");
    // Todos los productos y los pedidos
    let pedidosProm = this.pedidoServicio.obtenerPedidos();
    let productosProm = this.productoServicio.listarProductos(new ProductoModel({}));
    this.pedidos = await pedidosProm as PedidoModel[];
    console.log("Pedidos: " + this.pedidos.length);
    this.productos = await productosProm as ProductoModel[];
    console.log("Productos: " + this.productos.length);

    await this.obtenerProductosDePedido();
    console.log("Productos de pedidoññññññññññññññññññññññ. Longitud: " + this.productosDePedido.length);
    this.productosDePedido.forEach(productoDePedido =>
    {
      console.log("Pedido ID: " + productoDePedido.pedidoId + " - Producto ID: " + productoDePedido.poductoId + " - Cantidad: " + productoDePedido.cantidad );
    });

  }

  private async obtenerProductosDePedido()
  {

    console.log("productos de pedido")
    const tareas = this.pedidos.map(pedido =>
      this.productosDePedidoServicio
        .obtenerProductosDePedidoPorPedidoId(pedido.id)
        .then(pdp => {
          pdp.forEach(productoDePedido => {
            productoDePedido.pedidoId = pedido.id;
            this.productosDePedido.push(productoDePedido);
            console.log("Añadido Pedido: " + pedido.id + " - Producto: " + productoDePedido.poductoId);
          });
        })
    );

    await Promise.all(tareas);
    console.log("Ya tenemos todos los productos de pedido");

    

  }

}
