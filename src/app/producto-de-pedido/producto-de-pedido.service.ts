import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../CONSTANTES';
import { getAnalytics } from 'firebase/analytics';
import { addDoc, collection, doc, getFirestore } from 'firebase/firestore';
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



  
}
