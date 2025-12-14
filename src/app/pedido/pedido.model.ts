import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { productosDePedidoConverter } from "../productos-de-pedido/productosDePedido.model";

export class PedidoModel {
    id: string = "";
    orden: number = -1;
    estrellas: number = -1;
    oro: number = -1;
    productos: any[] = [];
    costeAcumulado: number = -1;
    bfo: number = -1;

    //constructor(id: number = -1, nombre: string, coste: number, tengo: number, almacen: string, materiaPrima: boolean, cantidadInicial: number, fabrica: string ) 
    constructor(datos: Partial<PedidoModel>) 
    {
        this.id = datos.id ?? "";
        this.orden = datos.orden ?? -1;
        this.estrellas = datos.estrellas ?? -1;
        this.oro = datos.oro ?? -1;
        this.productos = datos.productos ?? [];
    }

    public getBfoTXT()
    {
    return new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(this.bfo);

    }
  

  icono(): string | null
  {
    if (this.orden < 10 )
      return "/camioneta.jpg";
    else 
      return null;
  }

}

// 2. Create a FirestoreDataConverter for your Producto class
export const pedidoConverter: FirestoreDataConverter<PedidoModel> = {
  // Converts an Pedido object to a plain JavaScript object for Firestore
  toFirestore: (pedido: PedidoModel): DocumentData => {
    return {
            id:pedido.id,
            orden: pedido.orden,
            estrellas : pedido.estrellas,
            oro : pedido.oro,
            productos: pedido.productos
    };
  },

  // Converts a Firestore DocumentData snapshot back into an Pedido object
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): PedidoModel => {
    const data = snapshot.data(options);
//console.log("fromFirestore pedido", data);
    return new PedidoModel(
      {
                 'id':       snapshot.id,
                 'orden':       data['orden'],
                 'estrellas':       data['estrellas'],
                 'oro':       data['oro'],
      }
    );
  }

};