import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { IngredienteModel } from "../ingrediente/ingrediente.model";

export class comoGastoModel {
    nombre: string = "";
    cuantoGasto: number = -1;


    
    constructor(datos: Partial<comoGastoModel>) 
    {
      this.nombre = datos.nombre ?? "";
      this.cuantoGasto = datos.cuantoGasto ?? -1;
    }




}

// Firestore converter for comoGastoModel
export const comoGastoConverter: FirestoreDataConverter<comoGastoModel> = {
  toFirestore: (model: comoGastoModel): DocumentData => {
    return {
      nombre: model.nombre,
      cuantoGasto: model.cuantoGasto,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>, options?: SnapshotOptions): comoGastoModel => {
    const data = snapshot.data(options);
    return new comoGastoModel({
      nombre: data['nombre'],
      cuantoGasto: data['cuantoGasto'],
    });
  }
};
