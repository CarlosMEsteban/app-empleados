import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { IngredienteModel } from "../ingrediente/ingrediente.model";

export class IngredienteFaltaModel {
    cProductoId: string = "";
    nombre: string = "";
    tengo: number = -1;
    cantidad: number = -1; // Cantidad necesaria para el producto

    constructor(datos?: Partial<IngredienteFaltaModel>) {
        if (datos) {
            this.cProductoId = datos.cProductoId ?? "";
            this.nombre = datos.nombre ?? "";
            this.tengo = datos.tengo ?? -1;
            this.cantidad = datos.cantidad ?? -1;
        }
    }

    tengoMenosUnoACero(): number
    {      
        return Math.max(0, this.tengo);
    }
}

// Firestore converter for IngredienteFaltaModel
export const ingredienteFaltaConverter: FirestoreDataConverter<IngredienteFaltaModel> = {
  toFirestore: (model: IngredienteFaltaModel): DocumentData => {
    return {
      cProductoId: model.cProductoId,
      nombre: model.nombre,
      tengo: model.tengo,
      cantidad: model.cantidad,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>, options?: SnapshotOptions): IngredienteFaltaModel => {
    const data = snapshot.data(options);
    return new IngredienteFaltaModel({
                                        cProductoId: data['cProductoId'],
                                        nombre: data['nombre'],
                                        tengo: data['tengo'],
                                        cantidad: data['cantidad'],
    });
  }
};