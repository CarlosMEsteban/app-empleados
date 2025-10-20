import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class ProductosDePedidoModel {
    poductoId: string = "";
    pedidoId: string = "";
    nombreProducto: string = "";
    cantidad: number = -1;
    tengo: number = -1;

    //constructor(id: number = -1, nombre: string, coste: number, tengo: number, almacen: string, materiaPrima: boolean, cantidadInicial: number, fabrica: string ) 
    constructor(datos: Partial<ProductosDePedidoModel>) 
    {
      this.poductoId = datos.poductoId ?? "";
      this.pedidoId = datos.pedidoId ?? "";
      this.cantidad = datos.cantidad ?? -1;      
    }

}

// 2. Create a FirestoreDataConverter for your Producto class
export const productosDePedidoConverter: FirestoreDataConverter<ProductosDePedidoModel> = {
  // Converts an Pedido object to a plain JavaScript object for Firestore
  toFirestore: (productoDePedido: ProductosDePedidoModel): DocumentData => {
    return {
            productoId:productoDePedido.poductoId,
            cantidad: productoDePedido.cantidad,
    };
  },

  // Converts a Firestore DocumentData snapshot back into an Pedido object
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): ProductosDePedidoModel => {
    const data = snapshot.data(options);
    return new ProductosDePedidoModel(
      {
                 'poductoId':       data['productoId'],
                 'cantidad':       data['cnatidad'],
      }
    );
  }
};