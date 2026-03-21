import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, writeBatch, limit, query } from 'firebase/firestore';
import { firebaseConfig } from '../CONSTANTES';
import { evolucionarModelConverter, evolucionarModel } from './zzzevolucionar.model';

@Injectable({
  providedIn: 'root'
})
export class EvolucionarService {

  private app = initializeApp(firebaseConfig);
  private db = getFirestore(this.app);
  private evolucionarCollection = collection(this.db, 'evolucionar').withConverter(evolucionarModelConverter);

  constructor() { }

  // Alta
  async agregar(pokEvolucionar: evolucionarModel): Promise<void> {
    try {
      await addDoc(this.evolucionarCollection, pokEvolucionar);
      console.log('Pokemon para evolucionar agregado correctamente');
    } catch (error) {
      console.error('Error al agregar pokemon para evolucionar:', error);
      throw error;
    }
  }

  // Baja
  async eliminar(id: string): Promise<void> {
    try {
      const docRef = doc(this.db, 'evolucionar', id);
      await deleteDoc(docRef);
      console.log('Pokemon para evolucionar eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar pokemon para evolucionar:', error);
      throw error;
    }
  }


  // Obtener todos
  async obtener(): Promise<Array<evolucionarModel & { id: string }>> {
    try {
      const querySnapshot = await getDocs(this.evolucionarCollection);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error al obtener pokemones para evolucionar:', error);
      throw error;
    }
  }


}
