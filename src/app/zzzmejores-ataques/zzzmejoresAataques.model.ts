import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class MejoresAtaquesModel {
    public pokemon: string = "";
    public ataque: string = "";
    

    constructor(pokemon: string, ataque: string) {
        this.pokemon = pokemon;
        this.ataque = ataque;
        
    }
}


// FirestoreDataConverter for MejoresAtaquesModel
export const mejoresAtaqueModelConverter: FirestoreDataConverter<MejoresAtaquesModel> = {
  toFirestore: (mejorAtaque: MejoresAtaquesModel): DocumentData => {
    return {
      pokemon: mejorAtaque.pokemon,
      ataque: mejorAtaque.ataque
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): MejoresAtaquesModel => {
    const data = snapshot.data(options);
    return new MejoresAtaquesModel(
      data['pokemon'],
      data['ataque']
    );
  }
};

