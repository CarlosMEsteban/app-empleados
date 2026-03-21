import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class avancePokemonGoModel {
    public fecha: string;
    public hora: string;
    public pxIniciales: number;
    public pxFinales: number;

    constructor(fecha: string, hora: string, pxIniciales: number, pxFinales: number) {
        this.fecha = fecha;
        this.hora = hora;
        this.pxIniciales = pxIniciales;
        this.pxFinales = pxFinales;
    }
}


// FirestoreDataConverter for MisPokemonModel
export const avancePokemonGoModelConverter: FirestoreDataConverter<avancePokemonGoModel> = {
  toFirestore: (avance: avancePokemonGoModel): DocumentData => {
    return {
      fecha: avance.fecha,
      hora: avance.hora,
      pxIniciales: avance.pxIniciales,
      pxFinales: avance.pxFinales
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): avancePokemonGoModel => {
    const data = snapshot.data(options);
    return new avancePokemonGoModel(
      data['fecha'],
      data['hora'],
      data['pxIniciales'],
      data['pxFinales']
    );
  }
};


