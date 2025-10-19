import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../CONSTANTES';
import { getAnalytics } from 'firebase/analytics';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore';
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
  
}
