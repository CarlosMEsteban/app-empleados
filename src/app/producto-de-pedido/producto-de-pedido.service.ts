import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../CONSTANTES';
import { getAnalytics } from 'firebase/analytics';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore';
import { productoConverter } from '../producto/producto.model';
import { pedidoConverter } from '../pedido/pedido.model';
import { ProductosDePedidoModel } from '../productos-de-pedido/productosDePedido.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoDePedidoService 
{
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(this.app);
  
  db = getFirestore(this.app);

  pedidoCollectionRef = collection(this.db, 'pedido').withConverter(pedidoConverter);
  

    async anadirProductoDePedido(cPedidoId: string, productoDePedido: ProductosDePedidoModel)
    {
      console.log("entramos");
      // Obtengo referencia al pedido
      const pedidoRef = doc(this.db, "pedido", cPedidoId);
      console.log("Referencia al pedido obtenida");
      const productosSubcoleccionRef = collection(pedidoRef, "productos");
      await addDoc(productosSubcoleccionRef, {"cProductoId": productoDePedido.poductoId, "cantidad": productoDePedido.cantidad} );
      console.log("Añadido");
        

      console.log("------------------------------Terminamos----------------------------");

      
          
      
    }

    async obtenerProductosDePedidoPorPedidoId(cPedidoId: string): Promise<ProductosDePedidoModel[]>
    {
      const pedidoRef = doc(this.db, "pedido", cPedidoId);
      const productosSubcoleccionRef = collection(pedidoRef, "productos");
      const querySnapshot = await getDocs(productosSubcoleccionRef);
      const productos: ProductosDePedidoModel[] = []; 
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        const producto = new ProductosDePedidoModel({
          poductoId: data['cProductoId'],
          cantidad: data['cantidad']
        });
        productos.push(producto);
      });
      return productos;
    }


    async eliminarProductoDePedido(cPedidoId: string, cProductoId: string)
    {
      const pedidoRef = doc(this.db, "pedido", cPedidoId);
      const productosSubcoleccionRef = collection(pedidoRef, "productos");
      const querySnapshot = await getDocs(productosSubcoleccionRef);
      querySnapshot.forEach(async (docu) => {
        const data = docu.data(); 
        if (data['cProductoId'] === cProductoId)
        {
          const docRef = doc(productosSubcoleccionRef, docu.id);
          await deleteDoc(docRef);
          console.log("Producto eliminado del pedido");
        }
      });
    }
  
}
