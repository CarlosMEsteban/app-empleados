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

@Component({
  selector: 'app-orden-pedidos',
  imports: [OrdenPedidosHijo, NgFor], 
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
  ingredientes: IngredienteModel[] = [];



  constructor(pedidoServicio: PedidoService, 
              productoServicio: ProductoService,
              productosDePedidoServicio: ProductoDePedidoService,
            IngredienteServicio: IngredienteService) 
  {
    this.pedidoServicio = pedidoServicio;
    this.productoServicio = productoServicio;
    this.productosDePedidoServicio = productosDePedidoServicio;
    this.IngredienteServicio = IngredienteServicio;
  }

  async calcularBfoDeTodosLosPedidos()
  {
    await this.obtenerTodosLosDatos();
    this.pedidoServicio.calcularBfoDeTodosLosPedidos(this.pedidos, 
                                                      this.productosDePedido, 
                                                      this.ingredientes,
                                                      this.productos);
    await this.ordenarPorBfo();
  }

  private async obtenerTodosLosDatos()
  {

    // Todos los productos y los pedidos
    let pedidosProm = this.pedidoServicio.obtenerPedidos();    
    let productosProm = this.productoServicio.listarProductos(new ProductoModel({}));
    
    this.pedidos = await pedidosProm as PedidoModel[];
    this.productos = await productosProm as ProductoModel[];

    await this.obtenerProductosDePedido();
    //console.log("Productos de pedidoññññññññññññññññññññññ. Longitud: " + this.productosDePedido.length);
    /*this.productosDePedido.forEach(productoDePedido =>
    {
      console.log("Pedido ID: " + productoDePedido.pedidoId + " - Producto ID: " + productoDePedido.poductoId + " - Cantidad: " + productoDePedido.cantidad );
    });*/

    await this.obtenerIngredientes()

  }

  private async obtenerProductosDePedido()
  {

    //console.log("productos de pedido")
    const tareas = this.pedidos.map(pedido =>
      this.productosDePedidoServicio
        .obtenerProductosDePedidoPorPedidoId(pedido.id)
        .then(pdp => {
          pdp.forEach(productoDePedido => {
            productoDePedido.pedidoId = pedido.id;
            this.productosDePedido.push(productoDePedido);
            //console.log("Añadido Pedido: " + pedido.id + " - Producto: " + productoDePedido.poductoId);
          });
        })
     );

    await Promise.all(tareas);
    //console.log("Ya tenemos todos los productos de pedido");

  }


  private async obtenerIngredientes()
  {

    //console.log("Ingredientes")
    const tareas = this.productos.map(producto =>
      this.IngredienteServicio
        .ingredientesDeProducto(producto.cProductoId)
        .then(lIngredientes => {
          lIngredientes.forEach(ingrediente => {
            ingrediente.cProductoNecesitaId = producto.cProductoId;
            this.ingredientes.push(ingrediente);
            //console.log("El producot : " + ingrediente.cProductoNecesitaId + " necesita: " + ingrediente.cProductoNecesitadoId);
          });
        })
     );

    await Promise.all(tareas);
    //console.log("Ya tenemos todos los ingredientes");

  }  

 

  async ordenarPorBfo()
  {
      this.pedidos.sort((a, b) => b.bfo - a.bfo);
  }




}
