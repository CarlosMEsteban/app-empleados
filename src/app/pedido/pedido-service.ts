import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../CONSTANTES';
import { getAnalytics } from 'firebase/analytics';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { pedidoConverter, PedidoModel } from './pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(this.app);

  db = getFirestore(this.app);

  pedidoCollectionRef = collection(this.db, 'pedido').withConverter(pedidoConverter);
    
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

  
}
