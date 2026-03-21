import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, writeBatch, limit, query, where } from 'firebase/firestore';
import { firebaseConfig } from '../CONSTANTES';
import { SinEvolucionarModel, sinEvolucionarModelConverter } from './zzzsin-evolucionar.model';

@Injectable({
  providedIn: 'root'
})
export class SinEvolucionarService {

  private app = initializeApp(firebaseConfig);
  private db = getFirestore(this.app);
  private sinEvolucionarCollection = collection(this.db, 'sinEvolucionar').withConverter(sinEvolucionarModelConverter);

  constructor() { }

  // Alta
  async agregar(sinEvolucionar: SinEvolucionarModel): Promise<void> {
    try {
      await addDoc(this.sinEvolucionarCollection, sinEvolucionar);
      console.log('Sin evolucionar agregado correctamente');
    } catch (error) {
      console.error('Error al agregar Sin evolucionar:', error);
      throw error;
    }
  }

  // Baja
  async eliminar(id: string): Promise<void> {
    try {
      const docRef = doc(this.db, 'sinEvolucionar', id);
      await deleteDoc(docRef);
      console.log('Sin evolucionar eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar Sin evolucionar:', error);
      throw error;
    }
  }

  // Modificación
  async modificarSinEvolucionar(id: string, sinEvolucionar: Partial<SinEvolucionarModel>): Promise<void> {
    try {
      const docRef = doc(this.db, 'sinEvolucionar', id);
      await updateDoc(docRef, sinEvolucionar);
      console.log('Sin evolucionar modificado correctamente');
    } catch (error) {
      console.error('Error al modificar Sin evolucionar:', error);
      throw error;
    }
  }

  // Obtener todos
  async obtener(): Promise<Array<SinEvolucionarModel & { id: string }>> {
    try {
      const querySnapshot = await getDocs(this.sinEvolucionarCollection);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error al obtener Sin evolucionar:', error);
      throw error;
    }
  }

  // Obtener por ID
  async obtenerPorId(id: string): Promise<SinEvolucionarModel | null> {
    try {
      const docRef = doc(this.db, 'sinEvolucionar', id).withConverter(sinEvolucionarModelConverter);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      console.error('Error al obtener Sin evolucionar por ID:', error);
      throw error;
    }
  }

 

}
