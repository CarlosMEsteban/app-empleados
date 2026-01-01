import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from '../CONSTANTES';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { tareaConverter, TareaModel } from './tarea.model';
@Injectable({
  providedIn: 'root'
})
export class TareaService {

  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(this.app);

  db = getFirestore(this.app);

  tareaCollectionRef = collection(this.db, 'tarea').withConverter(tareaConverter);

  protected lPedidos: TareaModel[] = [];

  
    
  async insertarTarea(nuevaTarea: TareaModel)
  {
    const docRef = await addDoc(this.tareaCollectionRef, nuevaTarea);
    return docRef.id;
  }

  async obtenerTareas(): Promise<TareaModel[]>
  {
    const querySnapshot = await getDocs(this.tareaCollectionRef);

    const resultado: TareaModel[] = [];
    querySnapshot.forEach((doc) => {
      let tarea = doc.data();
      tarea.id = doc.id;
      resultado.push(tarea);

    });
    return resultado;
  }


  // Elimina todas tareas que no son fijas
  async comenzarElDia()
  {
    const querySnapshot = await getDocs(this.tareaCollectionRef);
    const deletePromises: Promise<void>[] = []; 
    querySnapshot.forEach((tarea) => 
    {
      if (!tarea.data().bFija)
      {
        const docRef = doc(this.db, 'tarea', tarea.id);
        deletePromises.push(deleteDoc(docRef));
      }
    });
    await Promise.all(deletePromises);
  }

  async listarTareas(): Promise<TareaModel[]>
  {
    const querySnapshot = await getDocs(this.tareaCollectionRef);
    const tareas: TareaModel[] = [];
    querySnapshot.forEach((document) => {
      tareas.push(document.data());
    }); 
    return tareas;
  }
  

  async modificar(datos: TareaModel)
  {
    const docRef = doc(this.tareaCollectionRef, datos.id!);
    updateDoc(docRef, {"bFija": datos.bFija,
                      "hInicio": datos.hInicio,
                      "hDuracion": datos.hDuracion,
                      "hFinal": datos.hFinal,
                      "dTarea": datos.dTarea,
                      "nOrden": datos.nOrden,
                      "nTotal": datos.nTotal,
                      "aPara": datos.aPara,
                      });
  }


  agregarTareasFijas()
  {
    const tareasFijas: TareaModel[] = [
        new TareaModel({bFija: true, hFinal: "00:51", hInicio: "00:00", hDuracion: 	"00:51", dTarea:	"Flotador", aPara:		"charca"}),
        new TareaModel({bFija: true, hFinal: "01:00", hInicio: "00:00", hDuracion: 	"01:00", dTarea:	"comida", aPara:		"burros"}),
        new TareaModel({bFija: true, hFinal: "01:40", hInicio: "00:00", hDuracion: 	"01:42", dTarea:	"Trampa", aPara:		"charca"}),
        new TareaModel({bFija: true, hFinal: "04:30", hInicio: "00:00", hDuracion: 	"04:30", dTarea:	"Recoger", aPara:		"tren vecindario"}),
        new TareaModel({bFija: true, hFinal: "05:15", hInicio: "00:00", hDuracion: 	"05:15", dTarea:	"cacahutes"	, aPara:	"ardillas"}),
        new TareaModel({bFija: true, hFinal: "05:46", hInicio: "00:00", hDuracion: 	"05:46", dTarea:	"Aparca", aPara:		"tren"}),
        new TareaModel({bFija: true, hFinal: "07:00", hInicio: "07:00", hDuracion: 	"00:00", dTarea:	"cine", aPara:		"cine"}),
        new TareaModel({bFija: true, hFinal: "07:00", hInicio: "00:00", hDuracion: 	"07:00", dTarea:	"comida", aPara:		"mascotas"}),
        new TareaModel({bFija: true, hFinal: "00:35", hInicio: "00:00", hDuracion: 	"00:38", dTarea:	"panal"	, aPara:	"abejas"}),
        new TareaModel({bFija: true, hFinal: "09:00", hInicio: "09:00", hDuracion:  "00:00", dTarea:	"Revisar", aPara:		"pase"}),
        new TareaModel({bFija: true, hFinal: "07:29", hInicio: "00:00", hDuracion: 	"07:29", dTarea:	"Pajarería", aPara:		"Pajarería"}),
        new TareaModel({bFija: true, hFinal: "07:00", hInicio: "07:00", hDuracion: 	"00:00", dTarea:	"Visitar", aPara:		"Greg"}),
        new TareaModel({bFija: true, hFinal: "08:00", hInicio: "08:00", hDuracion: 	"00:00", dTarea:	"tienda de diamonds", aPara:		"tienda de diamonds"}),
        new TareaModel({bFija: true, hFinal: "09:00", hInicio: "09:00", hDuracion: 	"00:00", dTarea:	"tirar", aPara:		"Ruleta"}),
        new TareaModel({bFija: true, hFinal: "08:00", hInicio: "08:00", hDuracion: 	"08:00", dTarea:	"Pajarera", aPara:		"Pajarera"})
      ];

    tareasFijas.forEach((tarea) => 
    {
      this.insertarTarea(tarea).then((id) => 
      {
        tarea.id = id;
      });
    });
  }

  modificarHoras(id: string, hInicio:string, hDuracion: string, hFinal: string)
  {
    const docRef = doc(this.tareaCollectionRef, id);
    updateDoc(docRef, {"hInicio": hInicio,
                      "hDuracion": hDuracion,
                      "hFinal": hFinal,
                      });
  }

  eliminarTarea(id: string)
  {
    const docRef = doc(this.db, 'tarea', id);
    return deleteDoc(docRef);
  }

  modificarTarea(tarea: TareaModel)
  {
    this.modificar(tarea);
  }
}
