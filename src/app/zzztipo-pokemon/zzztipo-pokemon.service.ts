import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc } from 'firebase/firestore';
import { firebaseConfig } from '../CONSTANTES';
import { TipoPokemonModel, tipoPokemonModelConverter } from './zzztipo-pokemon.model';
import { TipoPokemonIniciales } from './zzztipo-pokemon-Iniciales';

@Injectable({
  providedIn: 'root'
})
export class TipoPokemonService {

  private app = initializeApp(firebaseConfig);
  private db = getFirestore(this.app);
  private tipoPokemonCollection = collection(this.db, 'tipoPokemon').withConverter(tipoPokemonModelConverter);

  constructor() { }

  // Alta
  async agregarTipoPokemon(tipoPokemon: TipoPokemonModel): Promise<void> {
    try {
      await addDoc(this.tipoPokemonCollection, tipoPokemon);
      console.log('Tipo Pokémon agregado correctamente');
    } catch (error) {
      console.error('Error al agregar Tipo Pokémon:', error);
      throw error;
    }
  }

  // Baja
  async eliminarTipoPokemon(id: string): Promise<void> {
    try {
      const docRef = doc(this.db, 'tipoPokemon', id);
      await deleteDoc(docRef);
      console.log('Tipo Pokémon eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar Tipo Pokémon:', error);
      throw error;
    }
  }

  // Modificación
  async modificarTipoPokemon(id: string, tipoPokemon: Partial<TipoPokemonModel>): Promise<void> {
    try {
      const docRef = doc(this.db, 'tipoPokemon', id);
      await updateDoc(docRef, tipoPokemon);
      console.log('Tipo Pokémon modificado correctamente');
    } catch (error) {
      console.error('Error al modificar Tipo Pokémon:', error);
      throw error;
    }
  }

  // Obtener todos
  async obtenerTiposPokemon(): Promise<Array<TipoPokemonModel & { id: string }>> {
    try {
      const querySnapshot = await getDocs(this.tipoPokemonCollection);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error al obtener Tipos Pokémon:', error);
      throw error;
    }
  }

  // Obtener por ID
  async obtenerTipoPokemonPorId(id: string): Promise<TipoPokemonModel | null> {
    try {
      const docRef = doc(this.db, 'tipoPokemon', id).withConverter(tipoPokemonModelConverter);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      console.error('Error al obtener Tipo Pokémon por ID:', error);
      throw error;
    }
  }

   async cargarIniciales(): Promise<void> {
      try {
        const iniciales = new TipoPokemonIniciales();
        const tiposPokemon = iniciales.tipoPokemonIniciales;
  
        for (const tipo of tiposPokemon) {
          await this.agregarTipoPokemon(tipo);
        }
  
        console.log('Todos los tipos de cada pokemon iniciales han sido cargados correctamente');
      } catch (error) {
        console.error('Error al cargar tipos de cada pokemon iniciales:', error);
        throw error;
      }
    } 

}
