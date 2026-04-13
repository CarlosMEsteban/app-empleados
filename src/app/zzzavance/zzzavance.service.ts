import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, writeBatch, limit, query } from 'firebase/firestore';
import { firebaseConfig } from '../CONSTANTES';
import { avancePokemonGoModelConverter, avancePokemonGoModel } from './zzzavance.model';

@Injectable({
  providedIn: 'root'
})
export class AvancePokemonGoService {

  private app = initializeApp(firebaseConfig);  
  private db = getFirestore(this.app);
  private avanceCollection = collection(this.db, 'avancePokemonGo').withConverter(avancePokemonGoModelConverter);

  constructor() { }

  // Alta
  async agregar(avance: avancePokemonGoModel): Promise<void> {
    try {
      await addDoc(this.avanceCollection, avance);
      console.log('Avance agregado correctamente');
    } catch (error) {
      console.error('Error al agregar avance:', error);
      throw error;
    }
  }

  // Baja
  async eliminar(id: string): Promise<void> {
    try {
      const docRef = doc(this.db, 'avancePokemonGo', id);
      await deleteDoc(docRef);
      console.log('Avance eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar avance:', error);
      throw error;
    }
  }


  // Obtener todos
  async todos(): Promise<Array<avancePokemonGoModel & { id: string }>> {
    try {
      const querySnapshot = await getDocs(this.avanceCollection);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error al obtener avances:', error);
      throw error;
    }
  }


}
