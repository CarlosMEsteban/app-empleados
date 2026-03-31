import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where, writeBatch, limit, orderBy } from 'firebase/firestore';
import { firebaseConfig } from '../CONSTANTES';
import { PokemonTipoPokemonModel } from '../zzzpokemon-tipo-pokemon/zzzpokemon-tipo-pokemon.model';
import { MisPokemonDinamaxConverter, MisPokemonDinamaxModel } from './zzzmisPokemon-dinamax.model';
import { MisPokemonDinamaxIniciales } from './zzzmis-pokemon-dinamax.iniciales';

@Injectable({
  providedIn: 'root'
})
export class MisPokemonDinamaxService {

  private app = initializeApp(firebaseConfig);
  private db = getFirestore(this.app);
  private misPokemonDinamaxCollection = collection(this.db, 'misPokemonDinamax').withConverter(MisPokemonDinamaxConverter);

  constructor() { }

  // Alta: Agregar un nuevo MisPokemonDinamax
  async agregar(misPokemon: MisPokemonDinamaxModel): Promise<void> {
    try {
      await addDoc(this.misPokemonDinamaxCollection, misPokemon);
      console.log('MisPokemonDinamax agregado exitosamente');
    } catch (error) {
      console.error('Error al agregar MisPokemonDinamax:', error);
      throw error;
    }
  }

  // Baja: Eliminar un MisPokemonDinamax por ID
  async eliminar(id: string): Promise<void> {
    try {
      const docRef = doc(this.db, 'misPokemonDinamax', id);
      await deleteDoc(docRef);
      console.log('MisPokemonDinamax eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar MisPokemonDinamax:', error);
      throw error;
    }
  }

  /** Elimina todos los documentos de la colección 'misPokemonDinamax' en lotes de hasta 500 */
  async eliminarTodos(): Promise<number> {
    const BATCH_SIZE = 500;
    let totalDeleted = 0;

    while (true) {
      const colRef = collection(this.db, 'misPokemonDinamax').withConverter(MisPokemonDinamaxConverter);
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

  // Modificación: Actualizar un MisPokemonDinamax por ID
  async modificar(id: string, misPokemon: Partial<MisPokemonDinamaxModel>): Promise<void> {
    try {
      const docRef = doc(this.db, 'misPokemonDinamax', id);
      await updateDoc(docRef, misPokemon);
      console.log('MisPokemonDinamax modificado exitosamente');
    } catch (error) {
      console.error('Error al modificar MisPokemonDinamax:', error);
      throw error;
    }
  }

  // Obtener todos los MisPokemonDinamax
  async obtener(): Promise<Array<MisPokemonDinamaxModel & { id: string }>> {
    try {
      const querySnapshot = await getDocs(this.misPokemonDinamaxCollection);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error al obtener MisPokemonDinamax:', error);
      throw error;
    }
  }

    // Obtener todos los MisPokemonDinamax ordenados por DPSETBAtaqueCargado de forma ascendente
  async obtenerPorDPSETBCargadoNoPuedeMejorar(): Promise<Array<MisPokemonDinamaxModel & { id: string }>> {
    try {
      const q = query(this.misPokemonDinamaxCollection, orderBy("DPSETBAtaqueCargado", "asc"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({id: doc.id,  ...doc.data()}));
    } catch (error) {
      console.error('Error al obtener MisPokemonDinamax:', error);
      throw error;
    }
  }  

  // Obtener un MisPokemonDinamax por ID
  async obtenerPorId(id: string): Promise<MisPokemonDinamaxModel | null> {
    try {
      const docRef = doc(this.db, 'misPokemonDinamax', id).withConverter(MisPokemonDinamaxConverter);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al obtener MisPokemonDinamax por ID:', error);
      throw error;
    }
  }

  async cargar()
  {
    console.log("Eliminando mis PokemonDinamax existentes...");
    await this.eliminarTodos();
    console.log("MisPokemonDinamax existentes eliminados. Comenzando carga de mis PokemonDinamax iniciales...");
    console.log("Cargando mis PokemonDinamax...");
     const misPokemonIniciales: MisPokemonDinamaxModel[] = new MisPokemonDinamaxIniciales().misPokemonDinamaxIniciales;
         for (const miPokemon of misPokemonIniciales) {
      await this.agregar(miPokemon);
    } 
    
    console.log("Carga de mis PokemonDinamax finalizada");
  }

  calcularCadenaTipoPokemon(misPokemones: Array<MisPokemonDinamaxModel & { id: string }>, tiposPokemon: Array<PokemonTipoPokemonModel & { id: string }>) 
  {
    misPokemones.forEach(mp => {
      const tipos = tiposPokemon.filter(tp => tp.pokemon === mp.nombre).map(tp => tp.tipoPokemon);
      mp['cadenaTipoPokemon'] = tipos.join(' / ');
    });
  
  }

  async aumentarPoder(id: string, nuevoPC: number, nuevoSalud: number, polvos: number)
  {
    console.log(`Aumentando poder de MisPokemonDinamax con ID ${id}: nuevo PC = ${nuevoPC}, nueva Salud = ${nuevoSalud}, nuevos Polvos = ${polvos}`);
    const docRef = doc(this.db, 'misPokemon', id);
    console.log(`Referencia al documento obtenida: ${docRef.path}`);
    await updateDoc(docRef, {
      PC: nuevoPC,
      Salud: nuevoSalud,
      Polvos: polvos
    });


  }

  calcularCargado(miPok: MisPokemonDinamaxModel, DPS : number, multiplicador : number, factor: number) {
    miPok.DPSETBAtaqueCargado = Math.round(DPS * factor);
    miPok.ValorConMultiplicador = Math.round(miPok.PC * multiplicador +
                                                     miPok.Salud * multiplicador +
                                                     miPok.DPSETBAtaqueCargado * 8 +
                                                     miPok.DPSETBAtaqueRapido * 8);
    console.log('Valor con multiplicador calculado:', miPok.ValorConMultiplicador);
    miPok.ValorSinMultiplicador = Math.round(miPok.PC +
                                                     miPok.Salud +
                                                     miPok.DPSETBAtaqueCargado * 8 +
                                                     miPok.DPSETBAtaqueRapido * 8);
    console.log('Valor sin multiplicador calculado:', miPok.ValorSinMultiplicador);
  }  



}