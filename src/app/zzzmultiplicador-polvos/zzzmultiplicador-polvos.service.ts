import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, writeBatch, limit, query, where } from 'firebase/firestore';
import { firebaseConfig } from '../CONSTANTES';
import { MultiplicadorPolvosModel, multiplicadorPolvosModelConverter } from './multiplicadorPolvos.model';
import { MultiplicadorPolvosIniciales } from './zzzmultiplicador-Polvos.iniciales';
import { AtaqueModel } from '../zzzataques/zzzataques.model';

@Injectable({
  providedIn: 'root'
})
export class MultiplicadorPolvosService {

  private app = initializeApp(firebaseConfig);
  private db = getFirestore(this.app);
  private multiplicadorCollection = collection(this.db, 'multiplicadorPolvos').withConverter(multiplicadorPolvosModelConverter);

  constructor() { }

  // Alta
  async agregarMultiplicadorPolvos(multiplicador: MultiplicadorPolvosModel): Promise<void> {
    try {
      await addDoc(this.multiplicadorCollection, multiplicador);
      console.log('Multiplicador de polvos agregado correctamente');
    } catch (error) {
      console.error('Error al agregar multiplicador de polvos:', error);
      throw error;
    }
  }

  // Baja
  async eliminarMultiplicadorPolvos(id: string): Promise<void> {
    try {
      const docRef = doc(this.db, 'multiplicadorPolvos', id);
      await deleteDoc(docRef);
      console.log('Multiplicador de polvos eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar multiplicador de polvos:', error);
      throw error;
    }
  }

  /** Elimina todos los documentos de la colección 'multiplicadorPolvos' en lotes de hasta 500 */
  async eliminarTodosMultiplicadores(): Promise<number> {
    const BATCH_SIZE = 500;
    let totalDeleted = 0;

    while (true) {
      const colRef = collection(this.db, 'multiplicadorPolvos').withConverter(multiplicadorPolvosModelConverter);
      const q = query(colRef, limit(BATCH_SIZE));
      const snapshot = await getDocs(q);
      if (snapshot.empty) break;

      const batch = writeBatch(this.db);
      snapshot.docs.forEach(docSnap => {
        const docRef = doc(this.db, 'multiplicadorPolvos', docSnap.id);
        batch.delete(docRef);
      });

      await batch.commit();
      totalDeleted += snapshot.docs.length;
    }

    console.log(`Eliminados ${totalDeleted} multiplicadores de polvos.`);
    return totalDeleted;
  }

  // Modificación
  async modificarMultiplicadorPolvos(id: string, multiplicador: Partial<MultiplicadorPolvosModel>): Promise<void> {
    try {
      const docRef = doc(this.db, 'multiplicadorPolvos', id);
      await updateDoc(docRef, multiplicador);
      console.log('Multiplicador de polvos modificado correctamente');
    } catch (error) {
      console.error('Error al modificar multiplicador de polvos:', error);
      throw error;
    }
  }

  // Obtener todos
  async obtenerMultiplicadores(): Promise<Array<MultiplicadorPolvosModel & { id: string }>> {
    try {
      const querySnapshot = await getDocs(this.multiplicadorCollection);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error al obtener multiplicadores de polvos:', error);
      throw error;
    }
  }

  // Obtener por ID
  async obtenerMultiplicadorPorId(id: string): Promise<MultiplicadorPolvosModel | null> {
    try {
      const docRef = doc(this.db, 'multiplicadorPolvos', id).withConverter(multiplicadorPolvosModelConverter);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      console.error('Error al obtener multiplicador de polvos por ID:', error);
      throw error;
    }
  }

  /* NO FUNCIONA */
  async obtenerMultiplicadorPorPolvos(polvos: number): Promise<MultiplicadorPolvosModel | null> {
    try {
      const q = query(this.multiplicadorCollection, where('polvos', '==', polvos));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) 
        return querySnapshot.docs[0].data();
      else
        return null;    
    } catch (error) {
      console.error('Error al obtener multiplicador de polvos por cantidad de polvos:', error);
      throw error;
    }
  }

  async cargarMultiplicadoresIniciales(): Promise<void> {
    try {
    console.log("Eliminando multiplicadores existentes...");
    await this.eliminarTodosMultiplicadores();
    console.log("Multiplicadores existentes eliminados. Comenzando carga de multiplicadores iniciales...");

      const iniciales = new MultiplicadorPolvosIniciales();
      const multiplicadores = iniciales.misMultiplicadoresIniciales;

      for (const multiplicador of multiplicadores) {
        await this.agregarMultiplicadorPolvos(multiplicador);
      }

      console.log('Todos los multiplicadores iniciales han sido cargados correctamente');
    } catch (error) {
      console.error('Error al cargar multiplicadores iniciales:', error);
      throw error;
    }
  } 

   

}
