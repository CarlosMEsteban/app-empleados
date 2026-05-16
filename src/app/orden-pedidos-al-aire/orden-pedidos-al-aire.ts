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
import { NgFor, NgClass } from '@angular/common';
import { TitleService } from '../services/title.service';
import { PedidoServiceCacheado } from '../pedido/pedido-service-cacheado';
import { ProductoServiceCacheado } from '../producto/producto.service - cacheado';
import { IngredienteFaltaModel } from '../orden-pedidos-productos-hijo/ingredienteFalta.model';

@Component({
  selector: 'app-orden-pedidos-al-aire',
  imports: [OrdenPedidosHijo, NgFor, NgClass], 
  templateUrl: './orden-pedidos-al-aire.html',
  styleUrl: './orden-pedidos-al-aire.css'
})
export class OrdenPedidosAlAire
{
  pedidoServicioCacheado: PedidoServiceCacheado; 
  productoServicioCacheado: ProductoServiceCacheado;

  lProductos: ProductoModel[] = [];
  
  
  lPedidos: PedidoModel[] = [];

  lIngredientesFaltanDeUnProductoDePedido: IngredienteFaltaModel[] = []; // Lista de ingredientes que faltan de un producto para un pedido
  cProductoSeleccionado: string = ""; // ID del producto seleccionado para mostrar sus ingredientes faltantes
  cPedidoSeleccionado: string = ""; // ID del pedido seleccionado para mostrar sus productos e ingredientes faltantes



  constructor(pedidoServicioCacheado: PedidoServiceCacheado, 
              productoServicioCacheado: ProductoServiceCacheado,
          private titleServicio: TitleService) 
  {
    this.titleServicio.setTitle("Orden de Pedidos");
    this.pedidoServicioCacheado = pedidoServicioCacheado;
    this.productoServicioCacheado = productoServicioCacheado;
  }


  private async obtenerTodosLosDatos()
  {
    //console.log("Obteniendo datos...");
    this.lProductos = await this.productoServicioCacheado.getProductos();
    //console.log("Productos obtenidos: " + this.lProductos.length);
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
        //console.log("----Productos de pedido encontrados: " + productosDePedido.length);
        pedido.productos.forEach(productoDePedido =>
          {
            //console.log("  - Procesando producto de pedido: " + productoDePedido.poductoId);
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
      });
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



  ponerIngredientesFaltan(pdp: ProductosDePedidoModel)
  {
    //console.log("Empezando a poner ingredientes faltan para el producto de pedido: " + pdp.poductoId);
    this.lIngredientesFaltanDeUnProductoDePedido = this.lIngredientesFaltantes(pdp);
    this.cProductoSeleccionado = pdp.poductoId;
    this.cPedidoSeleccionado = pdp.pedidoId;
    //console.log("Ingredientes faltantes calculados: " + this.lIngredientesFaltanDeUnProductoDePedido.length);

  }

  public lIngredientesFaltantes(productoDePedido: ProductosDePedidoModel): IngredienteFaltaModel[]
  {
    console.clear();
    const cuantoFalta = productoDePedido.cantidad - productoDePedido.tengo;
    let ingredientesFaltantes: IngredienteFaltaModel[] = [];
    const producto = this.lProductos.find(p => p.cProductoId == productoDePedido.poductoId);
    if (producto)
    {
      console.log("Calculando ingredientes faltantes para el producto de pedido:", producto.nombre);
      console.log("Este producto necesita los siguientes ingredientes:", producto.ingrediente.length);
      //console.log("Ingredientes necesarios para el producto:", ingredientes.length);
      producto.ingrediente.forEach(ingrediente =>
        {
          const productoNecesitado = this.lProductos.find(p => p.cProductoId == ingrediente.cProductoNecesitadoId);
          console.log("  - Ingrediente:", ingrediente, "Producto necesitado:", productoNecesitado);
          if (productoNecesitado && ! productoNecesitado.esMateriaPrima())
          {
            let cantidadNecesitada = ingrediente.cantidad * (productoDePedido.cantidad - productoDePedido.tengo);
            
            if (cantidadNecesitada <= productoNecesitado.tengo)
              cantidadNecesitada = 0;
            let ingredienteFalta: IngredienteFaltaModel = new IngredienteFaltaModel();
            ingredienteFalta.cProductoId = ingrediente.cProductoNecesitadoId;
            ingredienteFalta.nombre = productoNecesitado.nombre;
            ingredienteFalta.cantidad = cantidadNecesitada;
            ingredienteFalta.tengo = productoNecesitado.tengo;
            ingredientesFaltantes.push(ingredienteFalta);
          }
        });
    }
    return ingredientesFaltantes;
  }  

  async calcularBfoDeTodosLosPedidos()
  { 
    await this.obtenerTodosLosDatos();
    console.clear();
    this.lPedidos.forEach(pedido =>
    {
      if (pedido.esTratado())
      {
        pedido.bfo = -1;
      }
      else
      {
        console.log("Calculando BFO para el pedido: " + pedido.orden);
        pedido.costeAcumulado = 0;
        pedido.productos.forEach(productoDePedido =>
          {
            const producto = this.lProductos.find(p => p.cProductoId == productoDePedido.poductoId);
            console.log("  - Calculando coste para el producto de pedido: " + productoDePedido.nombreProducto);
            if (producto && ! producto.esMateriaPrima())
            {
              const cuantoDeEsteProducto = productoDePedido.cantidad - productoDePedido.tengo;
              if (cuantoDeEsteProducto > 0)
                pedido.costeAcumulado += producto.coste * cuantoDeEsteProducto + this.coste(producto.ingrediente, cuantoDeEsteProducto);
            }
          });
        pedido.bfo = 1000 * (pedido.oro + pedido.estrellas * 1.2) / pedido.costeAcumulado;
        console.log("BFO calculado para el pedido " + pedido.orden + ": " + pedido.bfo + "(" + pedido.costeAcumulado + "))");
      }
    });

    this.ordenarPorBfo();

  }


  coste(lIngredientes: IngredienteModel[], cuanto: number): number
  {
    
    let coste = 0;
    lIngredientes.forEach(ingrediente =>
      {
        const producto = this.lProductos.find(p => p.cProductoId == ingrediente.cProductoNecesitadoId);
        if (producto && ! producto.esMateriaPrima())
        {
          let cuantoDeIngrediente = ingrediente.cantidad * cuanto - producto.tengo;
          if (cuantoDeIngrediente < 0)
            cuantoDeIngrediente = 0;
          else
          {
            coste += cuantoDeIngrediente * producto.coste + this.coste(producto.ingrediente, cuantoDeIngrediente);
          }
        }
      });
    return coste;
  }

  tratarPedido(pedido: PedidoModel)
  {
    if (confirm("¿Seguro que quieres tratar el pedido " + pedido.orden + "?"))
    {
      this.pedidoServicioCacheado.tratarPedido(pedido.id);
      this.calcularBfoDeTodosLosPedidos();
    }
  }

}
