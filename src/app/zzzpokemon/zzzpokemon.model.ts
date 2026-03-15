import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class PokemonModel {
    public nombre: string = "";
    
    constructor(
        nombre: string
    )
    {
        this.nombre = nombre;
    }
}


// FirestoreDataConverter for MisPokemonModel
export const pokemonModelConverter: FirestoreDataConverter<PokemonModel> = {
  toFirestore: (pokemon: PokemonModel): DocumentData => {
    return {
      nombre: pokemon.nombre
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): PokemonModel => {
    const data = snapshot.data(options);
    return new PokemonModel(
      data['nombre']
    );
  }
};

  

