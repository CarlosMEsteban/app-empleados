import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc } from 'firebase/firestore';
import { firebaseConfig } from '../CONSTANTES';
import { PokemonTipoPokemonModel, pokemonTipoPokemonModelConverter } from './zzzpokemon-tipo-pokemon.model';
import { MultiplicadorPolvosIniciales } from '../zzzmultiplicador-polvos/zzzmultiplicador-Polvos-Iniciales';
import { PokemonTipoPokemonIniciales } from './zzzpokemon-tipo-pokemon-Iniciales';

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
