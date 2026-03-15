import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class TipoPokemonModel {
    public tipo: string = "";
    public cadena: string = "";
    
    constructor(
        tipo: string,
        cadena: string
    )
    {
        this.tipo = tipo;
        this.cadena = cadena;
    }
}


// FirestoreDataConverter for MisPokemonModel
export const tipoPokemonModelConverter: FirestoreDataConverter<TipoPokemonModel> = {
  toFirestore: (tipoPokemon: TipoPokemonModel): DocumentData => {
    return {
      tipo: tipoPokemon.tipo,
      cadena: tipoPokemon.cadena
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): TipoPokemonModel => {
    const data = snapshot.data(options);
    return new TipoPokemonModel(
      data['tipo'],
      data['cadena']
    );
    
  }
};

  

