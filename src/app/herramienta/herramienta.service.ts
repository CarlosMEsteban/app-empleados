import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from '../CONSTANTES';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { herramientaConverter, HerramientaModel } from './herramienta.model';
@Injectable({
  providedIn: 'root'
})
export class HerramientaService {

  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(this.app);

  db = getFirestore(this.app);

  herramientaCollectionRef = collection(this.db, 'herramienta').withConverter(herramientaConverter);

  protected lHerramientas: HerramientaModel[] = [];

  todasHerramientas(): HerramientaModel[]
  {
    this.lHerramientas = [];
    getDocs(this.herramientaCollectionRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const herramienta = doc.data();
        this.lHerramientas.push(herramienta);
      });
    });
    return this.lHerramientas;
  }

    async listarHerramients(): Promise<HerramientaModel[]>
    {
      const querySnapshot = await getDocs(this.herramientaCollectionRef);
      const herramientas: HerramientaModel[] = [];
      querySnapshot.forEach((document) => {
        herramientas.push(document.data());
      }); 
      return herramientas;
    }
    
    
  async insertarHerramienta(nuevaHerramienta: HerramientaModel)
  {
    const docRef = await addDoc(this.herramientaCollectionRef, nuevaHerramienta);
    return docRef.id;
  }


  async modificar(herramienta: HerramientaModel)
  {
    const docRef = doc(this.herramientaCollectionRef, herramienta.id!);
    updateDoc(docRef, {
            nombre : herramienta.nombre,
            tengo : herramienta.tengo,
            ampliarTerreno : herramienta.ampliarTerreno,
            estacion : herramienta.estacion,
            ayuntamiento : herramienta.ayuntamiento,
            silo : herramienta.silo,
            granero : herramienta.granero,
            supermercado : herramienta.supermercado,
            cine : herramienta.cine,
            hostal : herramienta.hostal,
            spa : herramienta.spa,
            chiringuito : herramienta.chiringuito,
            tiendaDeRegalos : herramienta.tiendaDeRegalos
    });
     
  }


  crearHerramientas()
  {
    const herramientas: HerramientaModel[] = [
            new HerramientaModel({nombre: "Alquitrán", tengo: 0,	ampliarTerreno: 0,	estacion: 0,	ayuntamiento: 0,	silo: 0,	granero: 0,	restaurante: 0,	supermercado: 0,	cine: 0,	hostal: 0,	spa: 0,	chiringuito: 0,	tiendaDeRegalos: 0}),
            new HerramientaModel({nombre: "Berbiquí", tengo: 0,	ampliarTerreno: 0,	estacion: 0,	ayuntamiento: 0,	silo: 0,	granero: 0,	restaurante: 0,	supermercado: 0,	cine: 0,	hostal: 0,	spa: 0,	chiringuito: 0,	tiendaDeRegalos: 0}),
            new HerramientaModel({nombre: "Bloques de piedra", tengo: 0,	ampliarTerreno: 0,	estacion: 0,	ayuntamiento: 0,	silo: 0,	granero: 0,	restaurante: 0,	supermercado: 0,	cine: 0,	hostal: 0,	spa: 0,	chiringuito: 0,	tiendaDeRegalos: 0}),
            new HerramientaModel({nombre: "Cinta Adh", tengo: 0,	ampliarTerreno: 0,	estacion: 0,	ayuntamiento: 0,	silo: 0,	granero: 0,	restaurante: 0,	supermercado: 0,	cine: 0,	hostal: 0,	spa: 0,	chiringuito: 0,	tiendaDeRegalos: 0}),
            new HerramientaModel({nombre: "Clavos", tengo: 0,	ampliarTerreno: 0,	estacion: 0,	ayuntamiento: 0,	silo: 0,	granero: 0,	restaurante: 0,	supermercado: 0,	cine: 0,	hostal: 0,	spa: 0,	chiringuito: 0,	tiendaDeRegalos: 0}),
            new HerramientaModel({nombre: "Ladrillos", tengo: 0,	ampliarTerreno: 0,	estacion: 0,	ayuntamiento: 0,	silo: 0,	granero: 0,	restaurante: 0,	supermercado: 0,	cine: 0,	hostal: 0,	spa: 0,	chiringuito: 0,	tiendaDeRegalos: 0}),
            new HerramientaModel({nombre: "martillo", tengo: 0,	ampliarTerreno: 0,	estacion: 0,	ayuntamiento: 0,	silo: 0,	granero: 0,	restaurante: 0,	supermercado: 0,	cine: 0,	hostal: 0,	spa: 0,	chiringuito: 0,	tiendaDeRegalos: 0}),
            new HerramientaModel({nombre: "Paneles de ma", tengo: 0,	ampliarTerreno: 0,	estacion: 0,	ayuntamiento: 0,	silo: 0,	granero: 0,	restaurante: 0,	supermercado: 0,	cine: 0,	hostal: 0,	spa: 0,	chiringuito: 0,	tiendaDeRegalos: 0}),
            new HerramientaModel({nombre: "Perno", tengo: 0,	ampliarTerreno: 0,	estacion: 0,	ayuntamiento: 0,	silo: 0,	granero: 0,	restaurante: 0,	supermercado: 0,	cine: 0,	hostal: 0,	spa: 0,	chiringuito: 0,	tiendaDeRegalos: 0}),
            new HerramientaModel({nombre: "Pintura", tengo: 0,	ampliarTerreno: 0,	estacion: 0,	ayuntamiento: 0,	silo: 0,	granero: 0,	restaurante: 0,	supermercado: 0,	cine: 0,	hostal: 0,	spa: 0,	chiringuito: 0,	tiendaDeRegalos: 0}),
            new HerramientaModel({nombre: "Tabla", tengo: 0,	ampliarTerreno: 0,	estacion: 0,	ayuntamiento: 0,	silo: 0,	granero: 0,	restaurante: 0,	supermercado: 0,	cine: 0,	hostal: 0,	spa: 0,	chiringuito: 0,	tiendaDeRegalos: 0}),
            new HerramientaModel({nombre: "Tornillo", tengo: 0,	ampliarTerreno: 0,	estacion: 0,	ayuntamiento: 0,	silo: 0,	granero: 0,	restaurante: 0,	supermercado: 0,	cine: 0,	hostal: 0,	spa: 0,	chiringuito: 0,	tiendaDeRegalos: 0}),
            new HerramientaModel({nombre: "Escrituras", tengo: 0,	ampliarTerreno: 0,	estacion: 0,	ayuntamiento: 0,	silo: 0,	granero: 0,	restaurante: 0,	supermercado: 0,	cine: 0,	hostal: 0,	spa: 0,	chiringuito: 0,	tiendaDeRegalos: 0}),
            new HerramientaModel({nombre: "Estaca de marcar", tengo: 0,	ampliarTerreno: 0,	estacion: 0,	ayuntamiento: 0,	silo: 0,	granero: 0,	restaurante: 0,	supermercado: 0,	cine: 0,	hostal: 0,	spa: 0,	chiringuito: 0,	tiendaDeRegalos: 0}),
            //new HerramientaModel({nombre: "Mapa", tengo: 0,	ampliarTerreno: 0,	estacion: 0,	ayuntamiento: 0,	silo: 0,	granero: 0,	restaurante: 0,	supermercado: 0,	cine: 0,	hostal: 0,	spa: 0,	chiringuito: 0,	tiendaDeRegalos: 0}),
            new HerramientaModel({nombre: "Maza", tengo: 0,	ampliarTerreno: 0,	estacion: 0,	ayuntamiento: 0,	silo: 0,	granero: 0,	restaurante: 0,	supermercado: 0,	cine: 0,	hostal: 0,	spa: 0,	chiringuito: 0,	tiendaDeRegalos: 0})
    ];

    herramientas.forEach((herramienta) => 
    {
      this.insertarHerramienta(herramienta).then((id) => 
      {
        herramienta.id = id;
      });
    });
  }
}
