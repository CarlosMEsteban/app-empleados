import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class MultiplicadorPolvosModel {
    public polvos: number = -1;
    public multiplicador: number = -1;

    constructor(
        polvos: number,
        multiplicador: number
    ) {
        this.polvos = polvos;
        this.multiplicador = multiplicador;
    }
}


// FirestoreDataConverter for MisPokemonModel
export const multiplicadorPolvosModelConverter: FirestoreDataConverter<MultiplicadorPolvosModel> = {
  toFirestore: (pokemon: MultiplicadorPolvosModel): DocumentData => {
    return {
      polvos: pokemon.polvos,
      multiplicador: pokemon.multiplicador
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): MultiplicadorPolvosModel => {
    const data = snapshot.data(options);
    return new MultiplicadorPolvosModel(
      data['polvos'],
      data['multiplicador']
    );
  }
};

  

