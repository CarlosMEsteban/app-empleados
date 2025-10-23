import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../CONSTANTES';
import { getAnalytics } from 'firebase/analytics';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
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
  
}
