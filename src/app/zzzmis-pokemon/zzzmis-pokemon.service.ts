import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where, writeBatch, limit } from 'firebase/firestore';
import { firebaseConfig } from '../CONSTANTES';
import { MisPokemonModel, mejoresAtaqueModelConverter } from './zzzmisPokemon.model';
import { MisPokemonIniciales } from './zzzmis-pokemon.iniciales';

@Injectable({
  providedIn: 'root'
})
export class MisPokemonService {

  private app = initializeApp(firebaseConfig);
  private db = getFirestore(this.app);
  private misPokemonCollection = collection(this.db, 'misPokemon').withConverter(mejoresAtaqueModelConverter);

  constructor() { }

  // Alta: Agregar un nuevo MisPokemon
  async agregarMisPokemon(misPokemon: MisPokemonModel): Promise<void> {
    try {
      await addDoc(this.misPokemonCollection, misPokemon);
      console.log('MisPokemon agregado exitosamente');
    } catch (error) {
      console.error('Error al agregar MisPokemon:', error);
      throw error;
    }
  }

  // Baja: Eliminar un MisPokemon por ID
  async eliminarMisPokemon(id: string): Promise<void> {
    try {
      const docRef = doc(this.db, 'misPokemon', id);
      await deleteDoc(docRef);
      console.log('MisPokemon eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar MisPokemon:', error);
      throw error;
    }
  }

  /** Elimina todos los documentos de la colección 'misPokemon' en lotes de hasta 500 */
  async eliminarTodosMisPokemon(): Promise<number> {
    const BATCH_SIZE = 500;
    let totalDeleted = 0;

    while (true) {
      const colRef = collection(this.db, 'misPokemon').withConverter(mejoresAtaqueModelConverter);
      const q = query(colRef, limit(BATCH_SIZE));
      const snapshot = await getDocs(q);
      if (snapshot.empty) break;

      const batch = writeBatch(this.db);
      snapshot.docs.forEach(docSnap => {
        const docRef = doc(this.db, 'misPokemon', docSnap.id);
        batch.delete(docRef);
      });

      await batch.commit();
      totalDeleted += snapshot.docs.length;
    }

    console.log(`Eliminados ${totalDeleted} misPokemon.`);
    return totalDeleted;
  }

  // Modificación: Actualizar un MisPokemon por ID
  async modificarMisPokemon(id: string, misPokemon: Partial<MisPokemonModel>): Promise<void> {
    try {
      const docRef = doc(this.db, 'misPokemon', id);
      await updateDoc(docRef, misPokemon);
      console.log('MisPokemon modificado exitosamente');
    } catch (error) {
      console.error('Error al modificar MisPokemon:', error);
      throw error;
    }
  }

  // Obtener todos los MisPokemon
  async obtenerMisPokemon(): Promise<Array<MisPokemonModel & { id: string }>> {
    try {
      const querySnapshot = await getDocs(this.misPokemonCollection);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error al obtener MisPokemon:', error);
      throw error;
    }
  }

  // Obtener un MisPokemon por ID
  async obtenerMisPokemonPorId(id: string): Promise<MisPokemonModel | null> {
    try {
      const docRef = doc(this.db, 'misPokemon', id).withConverter(mejoresAtaqueModelConverter);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al obtener MisPokemon por ID:', error);
      throw error;
    }
  }

  async cargarMisPokemon()
  {
    console.log("Eliminando mis Pokemon existentes...");
    await this.eliminarTodosMisPokemon();
    console.log("MisPokemon existentes eliminados. Comenzando carga de mis Pokemon iniciales...");
    console.log("Cargando mis Pokemon...");
     const misPokemonIniciales: MisPokemonModel[] = new MisPokemonIniciales().misPokemonIniciales;
         for (const miPokemon of misPokemonIniciales) {
      await this.agregarMisPokemon(miPokemon);
    } 
    
    console.log("Carga de mis Pokemon finalizada");
  }
}