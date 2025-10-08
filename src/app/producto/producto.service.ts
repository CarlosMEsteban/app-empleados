import { Injectable } from '@angular/core';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { productoConverter, ProductoModel } from './producto.model';
import { Producto } from './producto';
import {firebaseConfig} from '../CONSTANTES';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(this.app);
  
  db = getFirestore(this.app);

  productosCollectionRef = collection(this.db, 'producto').withConverter(productoConverter);
  
  async agregarService(producto: ProductoModel) 
  {
    try 
    {
      const docRef = await addDoc(this.productosCollectionRef, producto);
      console.log("Documento escrito con ID:");
    }
    catch (e) 
    {
      console.error("Error al agregar documento: ", e);
    }
  }      
  
}
