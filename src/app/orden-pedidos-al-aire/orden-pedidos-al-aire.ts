import { Component } from '@angular/core';
import { PedidoService } from '../pedido/pedido-service';
import { ProductoService } from '../producto/producto.service';
import { PedidoModel } from '../pedido/pedido.model';
import { ProductoModel } from '../producto/producto.model';
import { ProductoDePedidoService } from '../producto-de-pedido/producto-de-pedido.service';
import { ProductosDePedidoModel } from '../productos-de-pedido/productosDePedido.model';
import { IngredienteService } from '../ingrediente/ingrediente-service';
import { IngredienteModel } from '../ingrediente/ingrediente.model';
import { OrdenPedidosHijo } from '../orden-pedidos-hijo/orden-pedidos-hijo';
import { NgFor } from '@angular/common';
import { TitleService } from '../services/title.service';
import { PedidoServiceCacheado } from '../pedido/pedido-service-cacheado';
import { ProductoServiceCacheado } from '../producto/producto.service - cacheado';

@Component({
  selector: 'app-orden-pedidos-al-aire',
  imports: [OrdenPedidosHijo, NgFor], 
  templateUrl: './orden-pedidos-al-aire.html',
  styleUrl: './orden-pedidos-al-aire.css'
})
export class OrdenPedidosAlAire
{
  pedidoServicioCacheado: PedidoServiceCacheado; 
  productoServicioCacheado: ProductoServiceCacheado;

  lProductos: ProductoModel[] = [];
  lProductosDePedido: ProductosDePedidoModel[] = [];
  lIngredientes: IngredienteModel[] = [];
  lPedidos: PedidoModel[] = [];



  constructor(pedidoServicioCacheado: PedidoServiceCacheado, 
              productoServicioCacheado: ProductoServiceCacheado,
          private titleServicio: TitleService) 
  {
    this.titleServicio.setTitle("Orden de Pedidos");
    this.pedidoServicioCacheado = pedidoServicioCacheado;
    this.productoServicioCacheado = productoServicioCacheado;
  }

  async calcularBfoDeTodosLosPedidos()
  {
    
    await this.obtenerTodosLosDatos();
    /*this.pedidoServicioCacheado.calcularBfoDeTodosLosPedidos(this.lProductosDePedido, 
                                                              this.lIngredientes,
                                                              this.lProductos);
    await this.ordenarPorBfo();*/
  }

  private async obtenerTodosLosDatos()
  {
    //console.log("Obteniendo datos...");
    this.lPedidos = await this.pedidoServicioCacheado.getPedidos();
    //console.log("Pedidos obtenidos: " + this.lPedidos.length);
    //this.lProductosDePedido = await this.pedidoServicioCacheado.getProductosDePedido();
    //console.log("Productos de pedido obtenidos: " + this.lProductosDePedido.length);

    this.lProductos = await this.productoServicioCacheado.getProductos();
    console.log("Productos obtenidos: " + this.lProductos.length);
    this.lIngredientes = await this.productoServicioCacheado.getIngredientes();
    //console.log("Ingredientes obtenidos: " + this.lIngredientes.length);

    this.ponerDescProductosEnPedidos();

  }

  ponerDescProductosEnPedidos()
  {
    this.lPedidos.forEach(pedido =>
      {
        pedido.productos.forEach(productoDePedido =>
          {
            const producto = this.lProductos.find(p => p.cProductoId == productoDePedido.poductoId);
            if (producto)
            {
              productoDePedido.nombreProducto = producto.nombre;
              productoDePedido.coste = producto.coste * productoDePedido.cantidad;
              productoDePedido.tengo = producto.tengo;
              console.log("Producto de pedido " + productoDePedido.poductoId + " es " + productoDePedido.nombreProducto);
            }
            else
              console.log("No se ha encontrado el producto " + productoDePedido.poductoId + " para el pedido " + pedido.id);
          })
      }
    );
  }
    


 

  async ordenarPorBfo()
  {
      this.lPedidos.sort((a, b) => b.bfo - a.bfo);
  }

  borrarPedidosTratados()
  {
    confirm("¿Seguro que quieres borrar los pedidos tratados?")
    this.pedidoServicioCacheado.borrarPedidosTratados();
    this.calcularBfoDeTodosLosPedidos();
  }


}
