import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where, writeBatch, limit } from 'firebase/firestore';
import { firebaseConfig } from '../CONSTANTES';
import { MejoresAtaquesModel, mejoresAtaqueModelConverter } from './zzzmejoresAataques.model';
import { MejoresAtaquesIniciales } from './zzzmejores-ataques.iniciales';

@Injectable({
  providedIn: 'root'
})
export class MejoresAtaquesService {

  private app = initializeApp(firebaseConfig);
  private db = getFirestore(this.app);

  // Get all MejoresAtaques
  async getAllMejoresAtaques(): Promise<MejoresAtaquesModel[]> {
    const colRef = collection(this.db, 'mejoresAtaques').withConverter(mejoresAtaqueModelConverter);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => doc.data());
  }

  // Get MejoresAtaques by ID
  async getMejoresAtaquesById(id: string): Promise<MejoresAtaquesModel | null> {
    const docRef = doc(this.db, 'mejoresAtaques', id).withConverter(mejoresAtaqueModelConverter);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? snapshot.data() : null;
  }

  // Add new MejoresAtaques
  async addMejoresAtaques(mejorAtaque: MejoresAtaquesModel): Promise<string> {
    const colRef = collection(this.db, 'mejoresAtaques').withConverter(mejoresAtaqueModelConverter);
    const docRef = await addDoc(colRef, mejorAtaque);
    return docRef.id;
  }

  // Update MejoresAtaques
  async updateMejoresAtaques(id: string, mejorAtaque: Partial<MejoresAtaquesModel>): Promise<void> {
    const docRef = doc(this.db, 'mejoresAtaques', id);
    await updateDoc(docRef, mejorAtaque);
  }

  // Delete MejoresAtaques
  async deleteMejoresAtaques(id: string): Promise<void> {
    const docRef = doc(this.db, 'mejoresAtaques', id);
    await deleteDoc(docRef);
  }

  /** Elimina todos los documentos de la colección 'mejoresAtaques' en lotes de hasta 500 */
  async eliminarTodosMejoresAtaques(): Promise<number> {
    const BATCH_SIZE = 500;
    let totalDeleted = 0;

    while (true) {
      const colRef = collection(this.db, 'mejoresAtaques').withConverter(mejoresAtaqueModelConverter);
      const q = query(colRef, limit(BATCH_SIZE));
      const snapshot = await getDocs(q);
      if (snapshot.empty) break;

      const batch = writeBatch(this.db);
      snapshot.docs.forEach(docSnap => {
        const docRef = doc(this.db, 'mejoresAtaques', docSnap.id);
        batch.delete(docRef);
      });

      await batch.commit();
      totalDeleted += snapshot.docs.length;
    }

    console.log(`Eliminados ${totalDeleted} mejores ataques.`);
    return totalDeleted;
  }

  // Get MejoresAtaques by Pokemon
  async getMejoresAtaquesByPokemon(pokemon: string): Promise<MejoresAtaquesModel[]> {
    const colRef = collection(this.db, 'mejoresAtaques').withConverter(mejoresAtaqueModelConverter);
    const q = query(colRef, where('pokemon', '==', pokemon));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
  }

  async cargarMejoresAtaquesIniciales()
  { 
    console.log("Eliminando MejoresAtaques existentes...");
    await this.eliminarTodosMejoresAtaques();
    console.log("MejoresAtaques existentes eliminados. Comenzando carga de mejores ataques iniciales...");    
    console.log("Cargando mejores ataques iniciales...");
    const mejoresAtaquesIniciales: MejoresAtaquesModel[] = new MejoresAtaquesIniciales().misMejoresAtaquesIniciales;

     for (const mejorAtaque of mejoresAtaquesIniciales) {
      await this.addMejoresAtaques(mejorAtaque);
    } 
    
    console.log("Carga de mejoresataques finalizada");
  }
}