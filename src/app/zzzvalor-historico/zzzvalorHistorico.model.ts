import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { Fechas } from "../util/fechas";

export class valorHistoricoModel {
    public fecha: string;
    public valorMedio: number;

    constructor(fecha: string, valorMedio: number) {
        this.fecha = fecha;
        this.valorMedio = valorMedio;
    }

}


export const valorHistoricoModelConverter: FirestoreDataConverter<valorHistoricoModel> = {
  toFirestore: (valor: valorHistoricoModel): DocumentData => {
    return {
      fecha: valor.fecha,
      valorMedio: valor.valorMedio
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): valorHistoricoModel => {
    const data = snapshot.data(options);
    return new valorHistoricoModel(
      data['fecha'],
      data['valorMedio']
    );
  }
};


