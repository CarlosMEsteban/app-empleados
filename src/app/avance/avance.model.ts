import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";


export class AvanceModel 
{
    id?: string; // Firestore document ID
    fecha: string = "";
    oro: number = -1;
    gasto: number = 0;
    estrellas: number = -1;
    estrellasObjetivo: number = -1;

    constructor(datos: Partial<AvanceModel>) 
    {
      this.id = datos.id;
      this.fecha = datos.fecha || "";
      this.oro = datos.oro || -1;
      this.gasto = datos.gasto || 0;
      this.estrellas = datos.estrellas || -1;
      this.estrellasObjetivo = datos.estrellasObjetivo || -1;
    }

    conseguido(): number
    {
      if (this.estrellasObjetivo > 0)
      {
        return Math.round((this.estrellas / this.estrellasObjetivo) * 100);
      }
      else
      {
        return 0;
      }
    }


    fechaParaOrdenar(): number
    {
      const partes = this.fecha.split('/'); 
      const fechaOrdenar = new Date(parseInt(partes[2], 10), parseInt(partes[1], 10) - 1, parseInt(partes[0], 10));
      return fechaOrdenar.getTime();
    }

    oroTXT()
    {
      return  new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(this.oro);
    }

    gastoTXT()
    {
      return  new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(this.gasto);
    }

    estrellasTXT()
    {
      return  new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(this.estrellas);
    }

    estrellasObjetivoTXT()
    {
      return  new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 }).format(this.estrellasObjetivo);
    }  



}

// 2. Create a FirestoreDataConverter for your Producto class
export const avanceConverter: FirestoreDataConverter<AvanceModel> = 
{
  // Converts an Pedido object to a plain JavaScript object for Firestore
  toFirestore: (avance: AvanceModel): DocumentData => {
    return {
            fecha : avance.fecha,
            oro : avance.oro,
            gasto : avance.gasto,
            estrellas : avance.estrellas,
            estrellasObjetivo : avance.estrellasObjetivo
            
    };
  },

  // Converts a Firestore DocumentData snapshot back into an Pedido object
  fromFirestore: (snapshot: QueryDocumentSnapshot,options: SnapshotOptions): AvanceModel => 
  {
    const data = snapshot.data(options);

    return new AvanceModel(
      {     'id':             snapshot.id,
            'fecha' :        data['fecha'],
            'oro' :          data['oro'],
            'gasto' :        data['gasto'],
            'estrellas' :    data['estrellas'],
            'estrellasObjetivo' : data['estrellasObjetivo']
        }
    );
  }


}


