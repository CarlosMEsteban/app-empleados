import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, writeBatch, limit, query } from 'firebase/firestore';
import { firebaseConfig } from '../CONSTANTES';
import { valorHistoricoModelConverter, valorHistoricoModel } from './zzzvalorHistorico.model';

@Injectable({
  providedIn: 'root'
})
export class valorHistoricoService {

  private app = initializeApp(firebaseConfig);  
  private db = getFirestore(this.app);
  private valorCollection = collection(this.db, 'valorHistorico').withConverter(valorHistoricoModelConverter);

  constructor() { }

  // Alta
  async agregar(fecha: string, valorMedio: number): Promise<void> {
    try {
      await addDoc(this.valorCollection, new valorHistoricoModel(fecha, valorMedio));
      console.log('Valor agregado correctamente');
    } catch (error) {
      console.error('Error al agregar valor:', error);
      throw error;
    }
  }

  // Baja
  async eliminar(id: string): Promise<void> {
    try {
      const docRef = doc(this.db, 'valorHistorico', id);
      await deleteDoc(docRef);
      console.log('Valor eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar valor:', error);
      throw error;
    }
  }




  // Obtener todos
  async obtener(): Promise<Array<valorHistoricoModel & { id: string }>> {
    try {
      const querySnapshot = await getDocs(this.valorCollection);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
    } catch (error) {
      console.error('Error al obtener valores históricos:', error);
      throw error;
    }
  }


}
