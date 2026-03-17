import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, writeBatch, limit, query } from 'firebase/firestore';
import { firebaseConfig } from '../CONSTANTES';
import { PokemonTipoPokemonModel, pokemonTipoPokemonModelConverter } from './zzzpokemon-tipo-pokemon.model';
import { PokemonTipoPokemonIniciales } from './zzzpokemon-tipo-pokemon.iniciales';

@Injectable({
  providedIn: 'root'
})
export class PokemonTipoPokemonService {

  private app = initializeApp(firebaseConfig);
  private db = getFirestore(this.app);
  private pokemonTipoCollection = collection(this.db, 'pokemonTipoPokemon').withConverter(pokemonTipoPokemonModelConverter);

  constructor() { }

  // Alta
  async agregarPokemonTipoPokemon(pokemonTipo: PokemonTipoPokemonModel): Promise<void> {
    try {
      await addDoc(this.pokemonTipoCollection, pokemonTipo);
      console.log('Pokemon Tipo Pokemon agregado correctamente');
    } catch (error) {
      console.error('Error al agregar Pokemon Tipo Pokemon:', error);
      throw error;
    }
  }

  // Baja
  async eliminarPokemonTipoPokemon(id: string): Promise<void> {
    try {
      const docRef = doc(this.db, 'pokemonTipoPokemon', id);
      await deleteDoc(docRef);
      console.log('Pokemon Tipo Pokemon eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar Pokemon Tipo Pokemon:', error);
      throw error;
    }
  }

  /** Elimina todos los documentos de la colección 'pokemonTipoPokemon' en lotes de hasta 500 */
  async eliminarTodosPokemonTipoPokemon(): Promise<number> {
    const BATCH_SIZE = 500;
    let totalDeleted = 0;

    while (true) {
      const colRef = collection(this.db, 'pokemonTipoPokemon').withConverter(pokemonTipoPokemonModelConverter);
      const q = query(colRef, limit(BATCH_SIZE));
      const snapshot = await getDocs(q);
      if (snapshot.empty) break;

      const batch = writeBatch(this.db);
      snapshot.docs.forEach(docSnap => {
        const docRef = doc(this.db, 'pokemonTipoPokemon', docSnap.id);
        batch.delete(docRef);
      });

      await batch.commit();
      totalDeleted += snapshot.docs.length;
    }

    console.log(`Eliminados ${totalDeleted} pokemon-tipo-pokemon.`);
    return totalDeleted;
  }

  // Modificación
  async modificarPokemonTipoPokemon(id: string, pokemonTipo: Partial<PokemonTipoPokemonModel>): Promise<void> {
    try {
      const docRef = doc(this.db, 'pokemonTipoPokemon', id);
      await updateDoc(docRef, pokemonTipo);
      console.log('Pokemon Tipo Pokemon modificado correctamente');
    } catch (error) {
      console.error('Error al modificar Pokemon Tipo Pokemon:', error);
      throw error;
    }
  }

  // Obtener todos
  async obtenerPokemonTipoPokemon(): Promise<Array<PokemonTipoPokemonModel & { id: string }>> {
    try {
      const querySnapshot = await getDocs(this.pokemonTipoCollection);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error al obtener Pokemon Tipo Pokemon:', error);
      throw error;
    }
  }

  // Obtener por ID
  async obtenerPokemonTipoPokemonPorId(id: string): Promise<PokemonTipoPokemonModel | null> {
    try {
      const docRef = doc(this.db, 'pokemonTipoPokemon', id).withConverter(pokemonTipoPokemonModelConverter);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      console.error('Error al obtener Pokemon Tipo Pokemon por ID:', error);
      throw error;
    }
  }
  async cargarIniciales(): Promise<void> {
    try {
    console.log("Eliminando pokemon-tipopokemon existentes...");
    await this.eliminarTodosPokemonTipoPokemon();
    console.log("pokemon-tipopokemon eliminados. Comenzando carga de pokemon-tipopokemon iniciales...");


      const iniciales = new PokemonTipoPokemonIniciales();
      const multiplicadores = iniciales.misPokemonTipoPokemonIniciales;

      for (const multiplicador of multiplicadores) {
        await this.agregarPokemonTipoPokemon(multiplicador);
      }

      console.log('Todos los tipos de cada pokemon iniciales han sido cargados correctamente');
    } catch (error) {
      console.error('Error al cargar tipos de cada pokemon iniciales:', error);
      throw error;
    }
  } 
}
