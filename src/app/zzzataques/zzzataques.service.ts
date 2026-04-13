import { Injectable } from '@angular/core';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc, writeBatch, limit, query } from 'firebase/firestore';
import { AtaqueModel, ataqueModelConverter } from './zzzataques.model';
import { firebaseConfig } from '../CONSTANTES';
import { AtaquesIniciales } from './zzzataques.iniciales';

@Injectable({
  providedIn: 'root'
})
export class ZZZAtaquesService {

  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(this.app);

  db = getFirestore(this.app);

  ataquesCollectionRef = collection(this.db, 'ataques').withConverter(ataqueModelConverter);

  async agregarAtaque(ataque: AtaqueModel) {
    try {
      const docRef = await addDoc(this.ataquesCollectionRef, ataque);
      console.log("Ataque agregado con ID:", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("Error al agregar ataque: ", e);
      throw e;
    }
  }

  async todos(): Promise<AtaqueModel[]> {
    try {
      const snapshot = await getDocs(this.ataquesCollectionRef);
      const ataques: AtaqueModel[] = [];
      snapshot.forEach(doc => {
        ataques.push(doc.data());
      });
      return ataques;
    } catch (e) {
      console.error("Error al obtener ataques: ", e);
      throw e;
    }
  }

  async eliminarAtaque(id: string) {
    try {
      const docRef = doc(this.db, 'ataques', id);
      await deleteDoc(docRef);
      console.log("Ataque eliminado con ID:", id);
    } catch (e) {
      console.error("Error al eliminar ataque: ", e);
      throw e;
    }
  }

  async actualizarAtaque(id: string, datosActualizados: Partial<AtaqueModel>) {
    try {
      const docRef = doc(this.db, 'ataques', id).withConverter(ataqueModelConverter);
      await updateDoc(docRef, datosActualizados);
      console.log("Ataque actualizado con ID:", id);
    } catch (e) {
      console.error("Error al actualizar ataque: ", e);
      throw e;
    }
  }

  /** Elimina todos los documentos de la colección 'ataques' en lotes de hasta 500 */
  async eliminarTodosAtaques(): Promise<number> {
    const BATCH_SIZE = 500;
    let totalDeleted = 0;

    while (true) {
      const q = query(this.ataquesCollectionRef, limit(BATCH_SIZE));
      const snapshot = await getDocs(q);
      if (snapshot.empty) break;

      const batch = writeBatch(this.db);
      snapshot.docs.forEach(docSnap => {
        const docRef = doc(this.ataquesCollectionRef, docSnap.id);
        batch.delete(docRef);
      });

      await batch.commit();
      totalDeleted += snapshot.docs.length;
    }

    console.log(`Eliminados ${totalDeleted} ataques.`);
    return totalDeleted;
  }

  async cargarAtaques()
  {
    console.log("Eliminando ataques existentes...");
    await this.eliminarTodosAtaques();
    console.log("Ataques existentes eliminados. Comenzando carga de ataques iniciales...");
    console.log("Carga inicial de ataques");
    const ataquesIniciales = new AtaquesIniciales().misAtaquesIniciales;
    for (const ataque of ataquesIniciales) {
      await this.agregarAtaque(ataque);
    } 
    
    console.log("Carga de ataques finalizada");

  }
}