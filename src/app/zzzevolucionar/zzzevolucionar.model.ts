import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class evolucionarModel {
    public pokemon: string;
    public observaciones: string;
    public bPosible: boolean;
    public bNuevo: boolean = false;

    constructor(pokemon: string, observaciones: string, bPosible: boolean, bNuevo: boolean) {
        this.pokemon = pokemon;
        this.observaciones = observaciones;
        this.bPosible = bPosible;
        this.bNuevo = bNuevo;

    }
}


// FirestoreDataConverter for MisPokemonModel
export const evolucionarModelConverter: FirestoreDataConverter<evolucionarModel> = {
  toFirestore: (pokemon: evolucionarModel): DocumentData => {
    return {
      pokemon: pokemon.pokemon,
      observaciones: pokemon.observaciones,
      bPosible: pokemon.bPosible,
      bNuevo: pokemon.bNuevo
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): evolucionarModel => {
    const data = snapshot.data(options);
    return new evolucionarModel(
      data['pokemon'],
      data['observaciones'],
      data['bPosible'],
      data['bNuevo']
    );
  }
};


  

