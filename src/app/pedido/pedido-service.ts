import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../CONSTANTES';
import { getAnalytics } from 'firebase/analytics';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { pedidoConverter, PedidoModel } from './pedido.model';
import { ProductosDePedidoModel } from '../productos-de-pedido/productosDePedido.model';
import { IngredienteModel } from '../ingrediente/ingrediente.model';
import { ProductoModel } from '../producto/producto.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(this.app);

  db = getFirestore(this.app);

  pedidoCollectionRef = collection(this.db, 'pedido').withConverter(pedidoConverter);

  protected lPedidos: PedidoModel[] = [];
  protected lProductosDePedido: ProductosDePedidoModel[] = [];
  protected lIngredientes: IngredienteModel[] = [];
  protected lProductos: ProductoModel[] = [];
    
  async insertarPedido(nuevoPedido: PedidoModel)
  {
    const docRef = await addDoc(this.pedidoCollectionRef, nuevoPedido);
    return docRef.id;
  }

  async obtenerPedidos(): Promise<PedidoModel[]>
  {
    const querySnapshot = await getDocs(this.pedidoCollectionRef);

    const pedidos: PedidoModel[] = [];
    querySnapshot.forEach((doc) => {
      pedidos.push(doc.data());
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
  
  async detallePedido(cPedidoId: string): Promise<PedidoModel>
  {
    const docRef = doc(this.pedidoCollectionRef, cPedidoId);
    const docSnap = await getDoc(docRef); 
    if (docSnap.exists()) {
      const datosPedido = docSnap.data() as PedidoModel;
      return datosPedido;
    } else {
      console.log("No such document!");
      return new PedidoModel({});
    }
  }

  async modificarBfo(cPedidoId: string, bfo: number)
  {
    const docRef = doc(this.pedidoCollectionRef, cPedidoId);
    updateDoc(docRef, {"Bfo": bfo});
  }


  async calcularBfoDeTodosLosPedidos(lPedidos: PedidoModel[], 
                                    lProductosDePedido: ProductosDePedidoModel[], 
                                    lIngredientes: IngredienteModel[],
                                    lProductos: ProductoModel[])
  {
    this.lPedidos = lPedidos;
    this.lProductosDePedido = lProductosDePedido;
    this.lIngredientes = lIngredientes;
    this.lProductos = lProductos;

    await this.calcularBfo();

  }



  async calcularBfo()
  {
    // Calculamos el coste para cada uno de los productos de pedido
    this.lProductosDePedido.forEach(pdp=>
      {
        let producto: ProductoModel | undefined = this.lProductos.find(p => p.cProductoId == pdp.poductoId);

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

}
