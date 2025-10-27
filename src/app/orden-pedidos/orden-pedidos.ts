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
    await this.calcularBfo();

    // Recuperamos todos los pedidos ordenados por Bfo
    await this.ordenarPorBfo();



  }

  private async obtenerTodosLosDatos()
  {
//    console.log("Empezamos");
    // Todos los productos y los pedidos
    let pedidosProm = this.pedidoServicio.obtenerPedidos();    
    let productosProm = this.productoServicio.listarProductos(new ProductoModel({}));
    
    this.pedidos = await pedidosProm as PedidoModel[];
/*let unPedidoProm = this.pedidoServicio.detallePedido("rmrWhYvP2x1EpXQPle7I");
let unPedido = await unPedidoProm as PedidoModel;
this.pedidos = [];
this.pedidos.push(unPedido);*/
    //console.log("Pedidos: " + this.pedidos.length);
    this.productos = await productosProm as ProductoModel[];
    //console.log("Productos: " + this.productos.length);

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

  async calcularBfo()
  {
    // Calculamos el coste para cada uno de los productos de pedido
    this.productosDePedido.forEach(pdp=>
      {
        let producto: ProductoModel | undefined = this.productos.find(p => p.cProductoId == pdp.poductoId);

        let falta = -1;
        if (producto == undefined)
          throw new Error("Producto no encontrado: '" + pdp.poductoId + "'");
        else
        {
          falta = this.falta(producto.tengo, pdp.cantidad);
          if (falta > 0)
          {
            pdp.coste = this.cuantoCuesta(producto.cProductoId, falta);
            let pedido: PedidoModel | undefined = this.pedidos.find(pedido => pedido.id == pdp.pedidoId);
            if (pedido == undefined)
              throw new Error("Pedido no encontrado: '" + pdp.pedidoId + "'");
            else
              pedido.costeAcumulado += pdp.coste;
          }
          else
          {
            pdp.coste = 0;
          }
          //console.log("Producto: " + producto.nombre + " falta: " + falta + " coste: " + pdp.coste);
        }
      });

    // Para cada pedido calculamos el beneficio
    this.pedidos.forEach(p=>
    {
      p.bfo = 1000 * (p.oro + p.estrellas * 1.2) / p.costeAcumulado;
      // Grabamos el beneficio de cada pedido
      this.pedidoServicio.modificarBfo(p.id, p.bfo);
    });

    


    

  }

  // Devuelve cuanto cuesta fabricar 'cantidad' el 'cProductoId' con lo que hay ahora mismo
  private cuantoCuesta(cProductoId: string, cantidad: number ): number
  {
    let resultado: number = 0;
    const producto: ProductoModel | undefined = this.productos.find(p => p.cProductoId == cProductoId);
    if (producto == undefined)
      throw new Error("Se ha pedido el coste de producir el producto: " + cProductoId + " pero ese producto NO EXISTE");
    else
    {
      resultado = cantidad * producto.coste; // Coste de producto el producto padre

      // Calculamos el coste de los ingredientes
      let ingredientesDeProducto: IngredienteModel[] = this.ingredientes.filter(i => i.cProductoNecesitaId == cProductoId); // Para 'fmeE8TrXaNys0I0DQ8Eu' devuelve un array de 1788 elementos
      ingredientesDeProducto.forEach(ingrediente => 
        {
          let falta = this.cuantoFaltaDeUnProducto(ingrediente.cProductoNecesitadoId, ingrediente.cantidad * cantidad);
          if (falta > 0)
            resultado +=this.cuantoCuesta(ingrediente.cProductoNecesitadoId, falta);
        });      
    }

    return resultado;

  }

  private cuantoFaltaDeUnProducto(cProducoId: string, cantidad: number): number
  {
    const producto: ProductoModel | undefined = this.productos.find(p => p.cProductoId == cProducoId);
    if (producto == undefined)
      throw new Error ("Se ha pedido saber cuánto falta del producto: " + cProducoId + ", y resultao que NO EXISTE");
    else 
      if (producto.materiaPrima)
        return 0;
      else
        return this.falta(producto.tengo, cantidad);
  }

  private falta(tengo: number, cantidad: number): number
  {
    if (cantidad <= tengo)
      return 0;
    else
      return cantidad - (tengo == -1 ? 0 : tengo);
  }

  async ordenarPorBfo()
  {
      this.pedidos.sort((a, b) => b.bfo - a.bfo);
  }

}
