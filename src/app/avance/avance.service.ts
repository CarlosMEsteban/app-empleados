import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from '../CONSTANTES';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { avanceConverter, AvanceModel } from './avance.model';

@Injectable({
  providedIn: 'root'
})
export class AvanceService {

  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(this.app);

  db = getFirestore(this.app);

  avanceCollectionRef = collection(this.db, 'avance').withConverter(avanceConverter);

  protected lAvances: AvanceModel[] = [];

  async todosAvance(): Promise<AvanceModel[]>
  {
    const querySnapshot = await getDocs(this.avanceCollectionRef);
    const avances: AvanceModel[] = [];
    querySnapshot.forEach((document) => {
      avances.push(document.data());
    }); 
    return avances;
  }
      

    async listarAvances(): Promise<AvanceModel[]>
    {
      const querySnapshot = await getDocs(this.avanceCollectionRef);
      const avances: AvanceModel[] = [];
      querySnapshot.forEach((document) => {
        avances.push(document.data());
      }); 
      return avances;
    }
    
    
  async insertarAvance(nuevaAvance: AvanceModel)
  {
    try
    {
      const docRef = await addDoc(this.avanceCollectionRef, nuevaAvance);
      console.log("Documento escrito con ID: ", docRef.id);
      return docRef.id;
    }
    catch (e)
    {
      console.error("Error añadiendo documento: ", e);
    }
    return null;
  }

  async modificar(avance: AvanceModel)
  {
    const docRef = doc(this.avanceCollectionRef, avance.id!); 
    updateDoc(docRef, {
            fecha : avance.fecha,
            oro : avance.oro,
            gasto : avance.gasto,
            estrellas : avance.estrellas,
            estrellasObjetivo : avance.estrellasObjetivo
    });
  }


 

  crearAvancesIniciales()
  {


    const avances: AvanceModel[] = [
new AvanceModel({"fecha": "10/03/2025", "oro": 2706188, "estrellas": 1			, "estrellasObjetivo": 1059000}),
new AvanceModel({"fecha": "11/03/2025", "oro": 2739073, "estrellas": 565869	, "estrellasObjetivo": 1059000}),
new AvanceModel({"fecha": "13/03/2025", "oro": 2744541, "estrellas": 697960	, "estrellasObjetivo": 1059000}),
new AvanceModel({"fecha": "14/03/2025", "oro": 2803495, "estrellas": 760159	, "estrellasObjetivo": 1059000}),
new AvanceModel({"fecha": "17/03/2025", "oro": 2917775, "estrellas": 878006	, "estrellasObjetivo": 1059000}),
new AvanceModel({"fecha": "18/03/2025", "oro": 2943143, "estrellas": 919619	, "estrellasObjetivo": 1059000}),
new AvanceModel({"fecha": "19/03/2025", "oro": 3026423, "estrellas": 1031961	, "estrellasObjetivo": 1059000}),
new AvanceModel({"fecha": "20/03/2025", "oro": 3047027, "estrellas": 1			, "estrellasObjetivo": 1070000}),
new AvanceModel({"fecha": "21/03/2025", "oro": 3066660, "estrellas": 72660	, "estrellasObjetivo": 1070000}),
new AvanceModel({"fecha": "24/03/2025", "oro": 3200222, "estrellas": 176902	, "estrellasObjetivo": 1070000}),
new AvanceModel({"fecha": "25/03/2025", "oro": 3218612, "estrellas": 217712	, "estrellasObjetivo": 1070000}),
new AvanceModel({"fecha": "26/03/2025", "oro": 3282105, "estrellas": 304094	, "estrellasObjetivo": 1070000}),
new AvanceModel({"fecha": "16/06/2025", "oro": 3542777, "estrellas": 1032832	, "estrellasObjetivo": 1070000}),
new AvanceModel({"fecha": "17/06/2025", "oro": 3561381, "estrellas": 1			, "estrellasObjetivo": 1081000}),
new AvanceModel({"fecha": "18/06/2025", "oro": 3671407, "estrellas": 140363	, "estrellasObjetivo": 1081000}),
new AvanceModel({"fecha": "19/06/2025", "oro": 3708134, "estrellas": 196573	, "estrellasObjetivo": 1081000}),
new AvanceModel({"fecha": "20/06/2025", "oro": 3727628, "estrellas": 226853	, "estrellasObjetivo": 1081000}),
new AvanceModel({"fecha": "21/06/2025", "oro": 3756168, "estrellas": 247118	, "estrellasObjetivo": 1081000}),
new AvanceModel({"fecha": "23/06/2025", "oro": 3817935, "estrellas": 324958	, "estrellasObjetivo": 1081000}),
new AvanceModel({"fecha": "24/06/2025", "oro": 3891769, "estrellas": 631983	, "estrellasObjetivo": 1081000}),
new AvanceModel({"fecha": "26/06/2025", "oro": 4127320, "estrellas": 959732	, "estrellasObjetivo": 1081000}),
new AvanceModel({"fecha": "27/06/2025", "oro": 4166621, "estrellas": 1			, "estrellasObjetivo": 1092000}),
new AvanceModel({"fecha": "01/07/2025", "oro": 4293976, "estrellas": 180520	, "estrellasObjetivo": 1092000})

    ];

    avances.forEach((avance) => 
    {
      this.insertarAvance(avance).then((id) => 
      {
        avance.id = id ?? "";
      });
    });
  }
}
