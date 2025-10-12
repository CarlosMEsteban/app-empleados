import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class IngredienteModel {
    public cProductoNecesitaId: string = "";
    public cProductoNecesitadoId: string = "";
    public cantidad: number = -1


    //constructor(id: number = -1, nombre: string, coste: number, tengo: number, almacen: string, materiaPrima: boolean, cantidadInicial: number, fabrica: string ) 
    constructor(datos: Partial<IngredienteModel>) 
    {
      this.cProductoNecesitaId = datos.cProductoNecesitaId ?? "";
       this.cProductoNecesitadoId = datos.cProductoNecesitadoId ?? "";
       this.cantidad = datos.cantidad ?? -1;
    }



    getCProductoNecesitaId(): string{return this.cProductoNecesitaId;}
    getCProductoNecesitadoId(): string{return this.cProductoNecesitadoId;}
    getCantidad(): number{return this.cantidad;}

    setCProductoNecesitaId(cProductoNecesitaId: string){this.cProductoNecesitaId = cProductoNecesitaId;}
    setCProductoNecesitadoId(cProductoNecesitadoId: string){this.cProductoNecesitadoId = cProductoNecesitadoId;}
    setCantidad(cantidad: number){this.cantidad = cantidad;}
}

// 2. Create a FirestoreDataConverter for your Producto class
export const productoConverter: FirestoreDataConverter<IngredienteModel> = {
  // Converts an Producto object to a plain JavaScript object for Firestore
  toFirestore: (producto: IngredienteModel): DocumentData => {
    return {
            cProductoNecesitadoId:producto.getCProductoNecesitadoId(),
            cantidad: producto.getCantidad(),
    };
  },

  // Converts a Firestore DocumentData snapshot back into an Empleado object
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): IngredienteModel => {
    const data = snapshot.data(options);
    return new IngredienteModel(
      {
                 'cProductoNecesitadoId':       data['cProductoNecesitadoId'],
                 'cantidad':       data['cantidad'],
      }
    );
  }


  

  }
