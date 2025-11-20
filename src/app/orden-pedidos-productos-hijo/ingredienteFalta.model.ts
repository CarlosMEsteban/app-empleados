import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { IngredienteModel } from "../ingrediente/ingrediente.model";

export class IngredienteFaltaModel {
    cProductoId: string = "";
    nombre: string = "";
    tengo: number = -1;
    cantidad: number = -1; // Cantidad necesaria para el producto


    



};