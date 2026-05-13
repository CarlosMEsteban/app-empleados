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
import { IngredienteFaltaModel } from '../orden-pedidos-productos-hijo/ingredienteFalta.model';

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
    this.lProductos = await this.productoServicioCacheado.getProductos();
    console.log("Productos obtenidos: " + this.lProductos.length);
    //this.lIngredientes = await this.productoServicioCacheado.getIngredientes();
    //console.log("Ingredientes obtenidos: " + this.lIngredientes.length);


    this.lPedidos = await this.pedidoServicioCacheado.getPedidos();

    //console.log("Pedidos obtenidos: " + this.lPedidos.length);
    //this.lProductosDePedido = await this.pedidoServicioCacheado.getProductosDePedido();
    //console.log("Productos de pedido obtenidos: " + this.lProductosDePedido.length);


    this.ponerDescProductosEnPedidos();

  }

  ponerDescProductosEnPedidos()
  {
    this.lPedidos.forEach(pedido =>
      {
        //console.log("Procesando pedido: " + pedido.id);
        const productosDePedido = pedido.productos;
        console.log("----Productos de pedido encontrados: " + productosDePedido.length);
        pedido.productos.forEach(productoDePedido =>
          {
            console.log("  - Procesando producto de pedido: " + productoDePedido.poductoId);
            const producto = this.lProductos.find(p => p.cProductoId == productoDePedido.poductoId);
            if (producto)
            { 
              productoDePedido.nombreProducto = producto.nombre;
              productoDePedido.coste = producto.coste * productoDePedido.cantidad;
              productoDePedido.tengo = producto.tengo;
              //productoDePedido.ingrediente = producto.ingrediente;
              //console.log("Producto de pedido " + productoDePedido.poductoId + " es " + productoDePedido.nombreProducto);
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

  public lIngredientesFaltantes(productoDePedido: ProductosDePedidoModel): IngredienteFaltaModel[]
  {
    let ingredientesFaltantes: IngredienteFaltaModel[] = [];
    const producto = this.lProductos.find(p => p.cProductoId == productoDePedido.poductoId);
    
    if (producto)
    {
      //console.log("Calculando ingredientes faltantes para el producto de pedido:", producto.nombre);
      const ingredientes = producto.ingrediente.filter(i => i.cProductoNecesitaId == producto.cProductoId);
      //console.log("Ingredientes necesarios para el producto:", ingredientes.length);
      ingredientes.forEach(ingrediente =>
        {
          const productoNecesitado = this.lProductos.find(p => p.cProductoId == ingrediente.cProductoNecesitadoId);
          //console.log("  - Ingrediente:", ingrediente, "Producto necesitado:", productoNecesitado);
          if (productoNecesitado)
          {
            const cantidadNecesitada = ingrediente.cantidad * (productoDePedido.cantidad - productoDePedido.tengo);
            
            if (cantidadNecesitada > productoNecesitado.tengo)
            {
              let ingredienteFalta: IngredienteFaltaModel = new IngredienteFaltaModel();
              ingredienteFalta.cProductoId = ingrediente.cProductoNecesitadoId;
              ingredienteFalta.nombre = productoNecesitado.nombre;
              ingredienteFalta.cantidad = cantidadNecesitada;
              ingredienteFalta.tengo = productoNecesitado.tengo;
              ingredientesFaltantes.push(ingredienteFalta);
            }
          }
        });
    }
    return ingredientesFaltantes;
  }

  ponerIngredientesFaltan(pdp: ProductosDePedidoModel)
  {
    console.log("Empezando a poner ingredientes faltan para el producto de pedido: " + pdp.poductoId);
    const ingredientesFaltantes = this.lIngredientesFaltantes(pdp);
    ingredientesFaltantes.forEach(ingredienteFalta =>
      {
        console.log("ñññññPoniendo falta para el ingrediente: " + ingredienteFalta.nombre);
        const producto = this.lProductos.find(p => p.cProductoId == ingredienteFalta.cProductoId);
        if (producto)
          console.log("Producto encontrado: " + producto.nombre + " tengo: " + producto.tengo);
        else
          console.log("Producto no encontrado para el ingrediente faltante: " + ingredienteFalta.cProductoId);
      });

  }

  costeTXT(prodPedido: ProductosDePedidoModel): string
  {
    const producto = this.lProductos.find(p => p.cProductoId == prodPedido.poductoId);
    if (producto)
    {
      let horas: number = Math.floor(producto.coste / 60);
      let minutos: number = producto.coste % 60;
      return `${horas}h ${minutos}m`;
    }
    else
      return "";
  }

  nombreProducto(prodPedido: ProductosDePedidoModel): string
  {
    const producto = this.lProductos.find(p => p.cProductoId == prodPedido.poductoId);
    if (producto)
      return producto.nombre;
    else
      return "";
  }


}
