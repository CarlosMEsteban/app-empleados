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
