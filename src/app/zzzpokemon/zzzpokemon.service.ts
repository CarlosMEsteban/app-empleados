import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, writeBatch, limit, query } from 'firebase/firestore';
import { firebaseConfig } from '../CONSTANTES';
import { PokemonModel, pokemonModelConverter } from './zzzpokemon.model';
import { PokemonIniciales } from './zzzpokemon.iniciales';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private app = initializeApp(firebaseConfig);
  private db = getFirestore(this.app);
  private pokemonCollection = collection(this.db, 'pokemon').withConverter(pokemonModelConverter);

  constructor() { }

  // Alta
  async agregarPokemon(pokemon: PokemonModel): Promise<void> {
    try {
      await addDoc(this.pokemonCollection, pokemon);
      console.log('Pokémon agregado correctamente');
    } catch (error) {
      console.error('Error al agregar Pokémon:', error);
      throw error;
    }
  }

  // Baja
  async eliminarPokemon(id: string): Promise<void> {
    try {
      const docRef = doc(this.db, 'pokemon', id);
      await deleteDoc(docRef);
      console.log('Pokémon eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar Pokémon:', error);
      throw error;
    }
  }

  /** Elimina todos los documentos de la colección 'pokemon' en lotes de hasta 500 */
  async eliminarTodosPokemon(): Promise<number> {
    const BATCH_SIZE = 500;
    let totalDeleted = 0;

    while (true) {
      const colRef = collection(this.db, 'pokemon').withConverter(pokemonModelConverter);
      const q = query(colRef, limit(BATCH_SIZE));
      const snapshot = await getDocs(q);
      if (snapshot.empty) break;

      const batch = writeBatch(this.db);
      snapshot.docs.forEach(docSnap => {
        const docRef = doc(this.db, 'pokemon', docSnap.id);
        batch.delete(docRef);
      });

      await batch.commit();
      totalDeleted += snapshot.docs.length;
    }

    console.log(`Eliminados ${totalDeleted} pokémon.`);
    return totalDeleted;
  }

  // Modificación
  async modificarPokemon(id: string, pokemon: Partial<PokemonModel>): Promise<void> {
    try {
      const docRef = doc(this.db, 'pokemon', id);
      await updateDoc(docRef, pokemon);
      console.log('Pokémon modificado correctamente');
    } catch (error) {
      console.error('Error al modificar Pokémon:', error);
      throw error;
    }
  }

  // Obtener todos
  async obtenerPokemons(): Promise<Array<PokemonModel & { id: string }>> {
    try {
      const querySnapshot = await getDocs(this.pokemonCollection);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error al obtener Pokémons:', error);
      throw error;
    }
  }

  // Obtener por ID
  async obtenerPokemonPorId(id: string): Promise<PokemonModel | null> {
    try {
      const docRef = doc(this.db, 'pokemon', id).withConverter(pokemonModelConverter);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      console.error('Error al obtener Pokémon por ID:', error);
      throw error;
    }
  }


  async cargarPokemonIniciales(): Promise<void> {
    try {
    console.log("Eliminando pokémon existentes...");
    await this.eliminarTodosPokemon();
    console.log("Pokémon existentes eliminados. Comenzando carga de pokémon iniciales...");

      
      const iniciales = new PokemonIniciales();
      const pokemonIniciales = iniciales.pokemonIniciales;

      for (const pokemon of pokemonIniciales) {
        await this.agregarPokemon(pokemon);
      }

      console.log('Todos los Pokemon iniciales han sido cargados correctamente');
    } catch (error) {
      console.error('Error al cargar Pokemon iniciales:', error);
      throw error;
    }
  }   



}
