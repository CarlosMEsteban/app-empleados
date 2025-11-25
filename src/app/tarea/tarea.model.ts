import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class TareaModel 
{
    id?: string; // Firestore document ID
    bFija: boolean = false; // Indice que la tarea hay que hacerla toodos los días y no se puede eliminar
    hInicio: string = "";
    hDuracion: string = "";
    hFinal: string = ""; // Calculado. Pero hay que guardarlo para ordenar bien las tareas
    dTarea: string = ""; // Puede contener el nombre de un producto, de varios o alguna otra cosa
    nOrden: number = -1;
    nTotal: number = -1;
    aPara: string = ""; // Para qué es la tarea Camioneta, barco... etc

    //constructor(id: number = -1, nombre: string, coste: number, tengo: number, almacen: string, materiaPrima: boolean, cantidadInicial: number, fabrica: string ) 
    constructor(datos: Partial<TareaModel>) 
    {
      this.id = datos.id;
      this.bFija = datos.bFija ?? false;
      this.hInicio = datos.hInicio ?? "";
      this.hDuracion = datos.hDuracion ?? "";
      this.hFinal = datos.hFinal ?? "";
      this.dTarea = datos.dTarea ?? "";
      this.nOrden = datos.nOrden ?? -1;
      this.nTotal = datos.nTotal ?? -1;
      this.aPara = datos.aPara ?? "";
    }

  public getHFInalNumero(): number
  {
    const partes = this.hFinal.split(':');
    if (partes.length == 2)
    {
      const horas = parseInt(partes[0], 10);
      const minutos = parseInt(partes[1], 10);
      return horas * 100 + minutos;
    }
    else 
    {
      return 0;
    }   
  }


}

// 2. Create a FirestoreDataConverter for your Producto class
export const tareaConverter: FirestoreDataConverter<TareaModel> = 
{
  // Converts an Pedido object to a plain JavaScript object for Firestore
  toFirestore: (tarea: TareaModel): DocumentData => {
    return {
            bFija: tarea.bFija,
            hInicio: tarea.hInicio,
            hDuracion: tarea.hDuracion,
            hFinal: tarea.hFinal,
            dTarea: tarea.dTarea,
            nOrden: tarea.nOrden,
            nTotal: tarea.nTotal,
          aPara: tarea.aPara,
    };
  },

  // Converts a Firestore DocumentData snapshot back into an Pedido object
  fromFirestore: (snapshot: QueryDocumentSnapshot,options: SnapshotOptions): TareaModel => 
  {
    const data = snapshot.data(options);

    return new TareaModel(
      { 
                  'id':             data['id'],
                  'bFija':       data['bFija'],
                  'hInicio':       data['hInicio'],
                  'hDuracion':       data['hDuracion'],
                  'hFinal':       data['hFinal'],
                  'dTarea':       data['dTarea'],
                  'nOrden':       data['nOrden'],
                  'nTotal':       data['nTotal'], 
                  'aPara':       data['aPara'],
                   }
    );
  }
}


