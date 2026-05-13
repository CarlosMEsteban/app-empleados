import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../CONSTANTES';
import { getAnalytics } from 'firebase/analytics';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { pedidoConverter, PedidoModel } from './pedido.model';
import { ProductosDePedidoModel } from '../productos-de-pedido/productosDePedido.model';
import { IngredienteModel } from '../ingrediente/ingrediente.model';
import { ProductoModel } from '../producto/producto.model';
import { Fechas } from '../util/fechas';
import { ProductoDePedidoService } from '../producto-de-pedido/producto-de-pedido.service';
@Injectable({
  providedIn: 'root'
})
export class PedidoServiceCacheado {

  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(this.app);

  db = getFirestore(this.app);

  pedidoCollectionRef = collection(this.db, 'pedido').withConverter(pedidoConverter);

  protected lPedidos: PedidoModel[] = [];
  protected fUltConsultaPedidos: Date | null = null;
  
  protected lIngredientes: IngredienteModel[] = [];
  protected lProductos: ProductoModel[] = [];

  protected productosDePedidoServicio: ProductoDePedidoService;

  constructor(productosDePedidoServicio: ProductoDePedidoService) {
    this.productosDePedidoServicio = productosDePedidoServicio;
  }

  public async getPedidos(): Promise<PedidoModel[]>
  {
    if (Fechas.haceMucho(this.fUltConsultaPedidos))
      await this.accederALaBD();      

    this.lPedidos.forEach(pedido =>
      {
        const productosDePedido = pedido.productos;
        console.log("----Productos de pedido encontrados: " + productosDePedido.length);
      });
    return this.lPedidos;
  }

/*  private async obtenerPedidos()
  {
    console.log(this.fUltConsultaPedidos);
    if (Fechas.haceMucho(this.fUltConsultaPedidos))
    {
      await this.accederALaBD();
      console.log("Sale 1");
      return this.lPedidos;
    }
    else
    {
      console.log("Sale 2");
      return this.lPedidos;
    }
  }
*/
  async accederALaBD()
  {
    //console.log("Obteniendo productos de Firestore");
    const pedidos = await this.listarPedidos();
    this.lPedidos = pedidos;
    this.fUltConsultaPedidos = new Date();
    
    console.log("*** ANTES del forEach, this.lPedidos.length = " + this.lPedidos.length);
    console.log("*** this.lPedidos = ", this.lPedidos);
    console.log("*** typeof this.lPedidos = ", typeof this.lPedidos);
    console.log("*** Array.isArray(this.lPedidos) = ", Array.isArray(this.lPedidos));
    
    const promesas = this.lPedidos.map(async (pedido) => {
      console.log("*** DENTRO del forEach, pedido.id = " + pedido.id);
      pedido.productos = await this.obtenerLosProductosDeUnPedido(pedido);
    });
    await Promise.all(promesas);

    
    console.log("Ya tenemos todos los productos de pedido");
    console.log("********Pedidos obtenidos: " + this.lPedidos.length);
  }

  async obtenerLosProductosDeUnPedido(pedido: PedidoModel): Promise<ProductosDePedidoModel[]>
  {
    return await this.productosDePedidoServicio.obtenerProductosDePedidoPorPedidoId(pedido.id);
  }

  async listarPedidos(): Promise<PedidoModel[]>
  {
    const querySnapshot = await getDocs(this.pedidoCollectionRef);
    const pedidos: PedidoModel[] = [];
    querySnapshot.forEach((document) => {
      pedidos.push(document.data());
    }); 
    return pedidos;
  }  


  async eliminarTodosPedidos()
  {
    const querySnapshot = await getDocs(this.pedidoCollectionRef);
    const deletePromises: Promise<void>[] = []; 
    querySnapshot.forEach((document) => {
      const docRef = doc(this.db, 'pedido', document.id);
      deletePromises.push(deleteDoc(docRef));
    });
    await Promise.all(deletePromises);
    this.lPedidos = [];
    this.fUltConsultaPedidos = null;
  }
  
  detallePedido(cPedidoId: string): PedidoModel
  {
    this.getPedidos();
    const pedido = this.lPedidos.find(p => p.id == cPedidoId);
    if (pedido == undefined)
      throw new Error("Pedido no encontrado: '" + cPedidoId + "'");
    else
      return pedido;
  }

  modificarBfo(cPedidoId: string, bfo: number)
  {
    this.getPedidos();
    const pedido = this.lPedidos.find(p => p.id == cPedidoId);
    const docRef = doc(this.pedidoCollectionRef, cPedidoId);
    updateDoc(docRef, {"Bfo": bfo});
    if (pedido == undefined)
      throw new Error("Pedido no encontrado: '" + cPedidoId + "'");
    else
      pedido.bfo = bfo;
  }


/*  calcularBfoDeTodosLosPedidos(
                                    lProductosDePedido: ProductosDePedidoModel[], 
                                    lIngredientes: IngredienteModel[],
                                    lProductos: ProductoModel[])
  {
    this.getPedidos();
    this.lProductosDePedido = lProductosDePedido;
    this.lIngredientes = lIngredientes;
    this.lProductos = lProductos;

    // Calculamos el coste para cada uno de los productos de pedido
    lProductosDePedido.forEach(pdp=>
      {
        let producto: ProductoModel | undefined = lProductos.find(p => p.cProductoId == pdp.poductoId);

        let falta = -1;
        if (producto == undefined)
          throw new Error("Producto no encontrado: '" + pdp.poductoId + "'");
        else
        {
          falta = this.falta(producto.tengo, pdp.cantidad);
          if (falta > 0)
          {
            pdp.coste = this.cuantoCuesta(producto.cProductoId, falta);
            let pedido: PedidoModel | undefined = this.lPedidos.find(pedido => pedido.id == pdp.pedidoId);
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
    this.lPedidos.forEach(p=>
    {
      p.bfo = 1000 * (p.oro + p.estrellas * 1.2) / p.costeAcumulado;
      // Grabamos el beneficio de cada pedido
      this.modificarBfo(p.id, p.bfo);
    });
  }
*/
  // Devuelve cuanto cuesta fabricar 'cantidad' el 'cProductoId' con lo que hay ahora mismo
  private cuantoCuesta(cProductoId: string, cantidad: number ): number
  {
    let resultado: number = 0;
    const producto: ProductoModel | undefined = this.lProductos.find(p => p.cProductoId == cProductoId);
    if (producto == undefined)
      throw new Error("Se ha pedido el coste de producir el producto: " + cProductoId + " pero ese producto NO EXISTE");
    else
    {
      resultado = cantidad * producto.coste; // Coste de producto el producto padre

      // Calculamos el coste de los ingredientes
      let ingredientesDeProducto: IngredienteModel[] = this.lIngredientes.filter(i => i.cProductoNecesitaId == cProductoId); // Para 'fmeE8TrXaNys0I0DQ8Eu' devuelve un array de 1788 elementos
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
    const producto: ProductoModel | undefined = this.lProductos.find(p => p.cProductoId == cProducoId);
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

  aMenosUno(cPedidoId: string)
  {
    let pedido = this.lPedidos.find(p => p.id == cPedidoId);
    pedido!.estrellas = -1;
    pedido!.oro = -1;
    const docRef = doc(this.pedidoCollectionRef, cPedidoId);
    updateDoc(docRef, {"estrellas": -1, "oro": -1});
  }


  eliminarPedido(cPedidoId: string)
  {
    this.lPedidos = this.lPedidos.filter(p => p.id != cPedidoId);

    deleteDoc(doc(this.db, 'pedido', cPedidoId));
  }

  borrarPedidosTratados()
  {
    this.lPedidos.forEach(pedido =>
      {
        if (pedido.estrellas == -1 && pedido.oro == -1)
        {

          this.eliminarPedido(pedido.id);
        }
      });

    this.lPedidos = this.lPedidos.filter(p => !(p.estrellas == -1 && p.oro == -1));
  }

}
