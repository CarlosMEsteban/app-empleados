import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class SinEvolucionarModel {
    public pokemon: string = "";
    public totCaramelos: number;
    public caramelos: number;
    public kms: number;
    public observaciones: string = "";

    
    constructor(pokemon: string, totCaramelos: number, caramelos: number, kms: number, observaciones: string) {
        this.pokemon = pokemon;
        this.totCaramelos = totCaramelos;
        this.caramelos = caramelos;
        this.kms = kms;
        this.observaciones = observaciones;
    }
}


// FirestoreDataConverter for SinEvolucionarModel
export const sinEvolucionarModelConverter: FirestoreDataConverter<SinEvolucionarModel> = {
  toFirestore: (sinEvolucionar: SinEvolucionarModel): DocumentData => {
    return {
      pokemon: sinEvolucionar.pokemon,
      totCaramelos: sinEvolucionar.totCaramelos,
      caramelos: sinEvolucionar.caramelos,
      kms: sinEvolucionar.kms,
      observaciones: sinEvolucionar.observaciones
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): SinEvolucionarModel => {
    const data = snapshot.data(options);
    return new SinEvolucionarModel(
      data['pokemon'],
      data['totCaramelos'],
      data['caramelos'],
      data['kms'],
      data['observaciones']
    );
    
  }
  };
