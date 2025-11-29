import { Injectable } from '@angular/core';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, DocumentSnapshot, getDoc, getDocs, getFirestore, limit, or, orderBy, query, QuerySnapshot, updateDoc, where, writeBatch } from 'firebase/firestore';
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

    /** Elimina todos los documentos de la colección 'producto' en lotes de hasta 500 */
  async eliminarTodosProductos(): Promise<number> {
    const BATCH_SIZE = 500;
    let totalDeleted = 0;

    while (true) {
      // tomar hasta BATCH_SIZE documentos
      const q = query(this.productosCollectionRef, limit(BATCH_SIZE));
      const snapshot = await getDocs(q);
      if (snapshot.empty) break;

      const batch = writeBatch(this.db);
      snapshot.docs.forEach(docSnap => {
        // usar la misma referencia de documento que usas en el servicio
        const docRef = doc(this.productosCollectionRef, docSnap.id);
        batch.delete(docRef);
      });

      await batch.commit();
      totalDeleted += snapshot.size;

      // si se eliminaron menos que el tamaño del lote, ya no quedan documentos
      if (snapshot.size < BATCH_SIZE) break;
    }

    return totalDeleted;
  }

  async cargarTodosProdutos()
  {
    
    console.log("Empezamos la carga masiva");
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 1, "nombre": "Azúcar Moreno", "coste": 17, "almacen": "", "materiaPrima": false, "fabrica": "Azucarera"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 2, "nombre": "Pan", "coste": 4, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 3, "nombre": "Nata", "coste": 17, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 4, "nombre": "Mantequilla", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 5, "nombre": "Zanahorias", "coste": 10, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 6, "nombre": "Soja", "coste": 20, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 7, "nombre": "Trigo", "coste": 2, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 8, "nombre": "Tortitas", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 9, "nombre": "Galleta", "coste": 51, "almacen": "", "materiaPrima": false, "fabrica": "PanaderÃ­a"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 10, "nombre": "Bacon", "coste": 240, "almacen": "", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 11, "nombre": "Huevos", "coste": 20, "almacen": "", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 12, "nombre": "Azúcar blanco", "coste": 34, "almacen": "", "materiaPrima": false, "fabrica": "Azucarera"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 13, "nombre": "Añil", "coste": 120, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 14, "nombre": "Maíz", "coste": 5, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 15, "nombre": "Palomitas", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 16, "nombre": "Queso", "coste": 51, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 17, "nombre": "Caña de azúcar", "coste": 30, "almacen": "SILO", "materiaPrima": true, "fabrica": "Azucarera"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 18, "nombre": "Leche", "coste": 60, "almacen": "", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 19, "nombre": "Tarta de Zanahoria", "coste": 51, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 20, "nombre": "Huevos con bacon", "coste": 51, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 22, "nombre": "Manzana", "coste": 840, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 23, "nombre": "Calabaza", "coste": 5, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 24, "nombre": "Pan de maíz", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 25, "nombre": "Lana", "coste": 420, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 26, "nombre": "Tarta de calabaza", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 27, "nombre": "Jersey", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 28, "nombre": "Hamburguesa", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 29, "nombre": "Tarta de Bacon", "coste": 153, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 30, "nombre": "Jersey azul", "coste": 153, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 32, "nombre": "Gorro azul de lana", "coste": 51, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 33, "nombre": "Almíbar", "coste": 76, "almacen": "", "materiaPrima": false, "fabrica": "Azucarera"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 34, "nombre": "Pastel de Zanahoria", "coste": 76, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 35, "nombre": "Palomitas con mantequilla", "coste": 51, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 36, "nombre": "Frambuesa", "coste": 1080, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 37, "nombre": "Pastel de nata", "coste": 153, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 38, "nombre": "Cereza", "coste": 1620, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 39, "nombre": "Pastel de bayas", "coste": 51, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 40, "nombre": "Lingote de plata", "coste": 480, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 41, "nombre": "Pastel de Queso", "coste": 204, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 42, "nombre": "Palomitas con chile", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 43, "nombre": "Chile", "coste": 240, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 44, "nombre": "Lingote de platino", "coste": 960, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 45, "nombre": "Zumo de Zanahoria", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 46, "nombre": "Magdalena de mora", "coste": 38, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 47, "nombre": "Magdalena de frambuesa", "coste": 38, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 48, "nombre": "Lingote de oro", "coste": 720, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 49, "nombre": "Hamburguesa de pescado", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 50, "nombre": "Pescado", "coste": 120, "almacen": "", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 51, "nombre": "Zumo de manzana", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 52, "nombre": "Gratinado de pescado", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 53, "nombre": "Tarta de manzana", "coste": 127, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 54, "nombre": "Mora", "coste": 2040, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 55, "nombre": "Zumo de cereza", "coste": 127, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 56, "nombre": "Tomate", "coste": 360, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 57, "nombre": "Helado de vainilla", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 58, "nombre": "Zumo de tomate", "coste": 76, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 59, "nombre": "Leche de cabra", "coste": 480, "almacen": "", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 60, "nombre": "Queso de cabra", "coste": 76, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 61, "nombre": "Polo de Cereza", "coste": 153, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 62, "nombre": "Pizza", "coste": 12, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 63, "nombre": "Tomates asados", "coste": 76, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 64, "nombre": "Fresa", "coste": 480, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 65, "nombre": "Helado de fresa", "coste": 204, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 66, "nombre": "Tarta de feta", "coste": 76, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 67, "nombre": "Mermelada de manzana", "coste": 306, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 68, "nombre": "Patata", "coste": 220, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 69, "nombre": "Patata asada", "coste": 29, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 70, "nombre": "Pastel de chocolate", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 71, "nombre": "Gratinado de bacon", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 72, "nombre": "Carbón refinado", "coste": 360, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 73, "nombre": "Cacao", "coste": 1800, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 74, "nombre": "Lingote de hierro", "coste": 420, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 75, "nombre": "Pastel de fresas", "coste": 153, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 76, "nombre": "Zumo de bayas", "coste": 153, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 77, "nombre": "Mermelada de Frambuesa", "coste": 357, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 78, "nombre": "Pizza picante", "coste": 15, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 79, "nombre": "Mermelada de cereza", "coste": 357, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 80, "nombre": "Pastelitos de patata", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 81, "nombre": "Gratinado de carne", "coste": 85, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 82, "nombre": "Pan de patata", "coste": 38, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 83, "nombre": "Mermelada de mora", "coste": 348, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 84, "nombre": "Helado de chocolate", "coste": 127, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 85, "nombre": "Pulsera", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 86, "nombre": "Collar", "coste": 153, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 87, "nombre": "Pescado y patatas", "coste": 76, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 88, "nombre": "Café Expreso", "coste": 5, "almacen": "", "materiaPrima": false, "fabrica": "CafeterÃ­a"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 89, "nombre": "Tela de algodón", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 90, "nombre": "Chaparreras de lana", "coste": 76, "almacen": "", "materiaPrima": false, "fabrica": "Coser"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 92, "nombre": "Camisa de algodón", "coste": 38, "almacen": "", "materiaPrima": false, "fabrica": "Coser"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 93, "nombre": "Granos de café", "coste": 2500, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 94, "nombre": "Café con leche", "coste": 10, "almacen": "", "materiaPrima": false, "fabrica": "CafeterÃ­a"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 95, "nombre": "Pulsera metálica", "coste": 76, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 96, "nombre": "Vestido violeta", "coste": 114, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 97, "nombre": "Palomitas con chocolate", "coste": 127, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 98, "nombre": "Café Moca", "coste": 15, "almacen": "", "materiaPrima": false, "fabrica": "CafeterÃ­a"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 99, "nombre": "Langosta", "coste": 500, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 100, "nombre": "Moca con frambuesa", "coste": 30, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 101, "nombre": "Pizza de Marisco", "coste": 12, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 102, "nombre": "Sopa de langosta", "coste": 127, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 103, "nombre": "Sopa de tomate", "coste": 76, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 104, "nombre": "Chocolate caliente", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": "CafeterÃ­a"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 105, "nombre": "Miel", "coste": 17, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 106, "nombre": "Tarta de manzana y miel", "coste": 200, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 108, "nombre": "Brocheta de langosta", "coste": 34, "almacen": "", "materiaPrima": false, "fabrica": "Barbacoa"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 109, "nombre": "Panal", "coste": 30, "almacen": "", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 110, "nombre": "Pastel de manzana y miel", "coste": 170, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 112, "nombre": "Bufanda roja", "coste": 127, "almacen": "", "materiaPrima": false, "fabrica": "Telar"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 113, "nombre": "Sopa de calabaza", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 114, "nombre": "Palomitas con miel", "coste": 76, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 115, "nombre": "Algodón", "coste": 150, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 116, "nombre": "Mermelada de fresa", "coste": 382, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 119, "nombre": "Cera de abejas", "coste": 45, "almacen": "", "materiaPrima": false, "fabrica": "Miel"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 121, "nombre": "Vela de fresa", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 123, "nombre": "Vela de frambuesa", "coste": 89, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 124, "nombre": "Manzana caramelizada", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 125, "nombre": "Caramelos", "coste": 76, "almacen": "", "materiaPrima": false, "fabrica": "Caramelos"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 127, "nombre": "Sopa de pescado", "coste": 153, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 128, "nombre": "Almohada", "coste": 155, "almacen": "", "materiaPrima": false, "fabrica": "Coser"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 129, "nombre": "Pluma de pato", "coste": 180, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 131, "nombre": "Salsa de soja", "coste": 153, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 132, "nombre": "Makis", "coste": 60, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 133, "nombre": "Arroz", "coste": 45, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 134, "nombre": "Aceitunas", "coste": 1500, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 135, "nombre": "Piruleta", "coste": 612, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 136, "nombre": "Lechuga", "coste": 200, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 137, "nombre": "Ensalada griega", "coste": 76, "almacen": "", "materiaPrima": false, "fabrica": "Ensaladas"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 138, "nombre": "Manta", "coste": 178, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 139, "nombre": "Sushi de langosta", "coste": 60, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 140, "nombre": "Aceite de oliva", "coste": 38, "almacen": "", "materiaPrima": false, "fabrica": "Salsas"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 141, "nombre": "Gominolas", "coste": 1224, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 142, "nombre": "S.vegetal", "coste": 34, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 143, "nombre": "Ensalada con bacon", "coste": 89, "almacen": "", "materiaPrima": false, "fabrica": "Ensaladas"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 144, "nombre": "Mayonesa", "coste": 12, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 146, "nombre": "Sushi de huevo", "coste": 120, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 147, "nombre": "Cóctel de marisco", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": "Ensaladas"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 148, "nombre": "S.de Bacon", "coste": 85, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 149, "nombre": "Smoothie de bayas", "coste": 63, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 150, "nombre": "S.de huevo", "coste": 68, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 151, "nombre": "Smoothie verde", "coste": 38, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 152, "nombre": "Limón", "coste": 1440, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 154, "nombre": "Cuajada de limón", "coste": 21, "almacen": "", "materiaPrima": false, "fabrica": "Salsas"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 156, "nombre": "Pasta fresca", "coste": 15, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 157, "nombre": "Ensalada de pasta", "coste": 127, "almacen": "", "materiaPrima": false, "fabrica": "Ensaladas"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 158, "nombre": "Tarta de limón", "coste": 114, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 159, "nombre": "Salsa de tomate", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 160, "nombre": "Tostada con miel", "coste": 51, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 161, "nombre": "Pastel de limón", "coste": 127, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 162, "nombre": "Smoothie de Yogur", "coste": 51, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 164, "nombre": "Sombrero de Cloché", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 165, "nombre": "Vela de limón", "coste": 114, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 166, "nombre": "Sombrero de copa", "coste": 178, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 167, "nombre": "Ñoquis", "coste": 80, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 168, "nombre": "Fideo de arroz", "coste": 20, "almacen": "", "materiaPrima": false, "fabrica": "Pasta Máquina"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 169, "nombre": "Sopa de fideos", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 170, "nombre": "Sombrero de playa", "coste": 127, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 171, "nombre": "Mermelada de Naranja", "coste": 433, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 172, "nombre": "Naranja", "coste": 1920, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 173, "nombre": "Zumo de naranja", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 174, "nombre": "Perrito caliente", "coste": 30, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 175, "nombre": "Cebolla a la parrilla", "coste": 51, "almacen": "", "materiaPrima": false, "fabrica": "Barbacoa"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 176, "nombre": "Cebolla", "coste": 300, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 177, "nombre": "Sopa de cebolla", "coste": 127, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 178, "nombre": "Lasaña", "coste": 100, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 179, "nombre": "Tarta de melocotón", "coste": 127, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 180, "nombre": "Melocotón", "coste": 1920, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 182, "nombre": "Perrito de maíz", "coste": 60, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 183, "nombre": "Sorbete de naranja", "coste": 178, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 184, "nombre": "Salsa picante", "coste": 17, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 185, "nombre": "Sopa de patata", "coste": 127, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 186, "nombre": "Taco", "coste": 45, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 187, "nombre": "Taco de pescado", "coste": 90, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 188, "nombre": "Sopa de langosta", "coste": 120, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 189, "nombre": "Mermelada de melocotón", "coste": 408, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 190, "nombre": "Pasta con langosta", "coste": 120, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 191, "nombre": "Perrito con cebolla", "coste": 75, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 192, "nombre": "Té verde", "coste": 30, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 194, "nombre": "Hojas de té", "coste": 390, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 195, "nombre": "Té con leche", "coste": 45, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 196, "nombre": "Ensalada de frutas", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": "Ensaladas"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 197, "nombre": "Quesudilla", "coste": 60, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 198, "nombre": "Té con miel", "coste": 40, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 199, "nombre": "Helado de melocotón", "coste": 153, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 200, "nombre": "Olivada", "coste": 38, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 201, "nombre": "Ramo rústico", "coste": 45, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 202, "nombre": "Rollito de verano", "coste": 51, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 203, "nombre": "Perrito vegetariano", "coste": 45, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 204, "nombre": "Chal de flores", "coste": 76, "almacen": "", "materiaPrima": false, "fabrica": "Telar"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 205, "nombre": "Girasoles", "coste": 90, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 206, "nombre": "Pasta carbonara", "coste": 150, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 207, "nombre": "Uva", "coste": 150, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 208, "nombre": "Zumo de uva", "coste": 127, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 209, "nombre": "Helado de melocotón", "coste": 153, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 210, "nombre": "Ensalada veraniega", "coste": 153, "almacen": "", "materiaPrima": false, "fabrica": "Ensaladas"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 211, "nombre": "Mermelada de uva", "coste": 331, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 212, "nombre": "Corona de flores", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": "Sombrererï¿½a"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 213, "nombre": "Peonías", "coste": 240, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 214, "nombre": "Té con limón", "coste": 20, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 216, "nombre": "Nachos", "coste": 75, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 217, "nombre": "Batido mixto", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": "Licuadora"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 218, "nombre": "Helado de menta", "coste": 114, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 219, "nombre": "Menta", "coste": 180, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 220, "nombre": "Maki grande", "coste": 90, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 221, "nombre": "Crudités", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": "Ensaladas"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 222, "nombre": "Pimiento", "coste": 270, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 223, "nombre": "S.de cebolla y queso", "coste": 76, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 224, "nombre": "Latte Caramelo", "coste": 15, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 225, "nombre": "Café helado de plátano", "coste": 20, "almacen": "", "materiaPrima": false, "fabrica": "CafeterÃ­a"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 226, "nombre": "Plátano", "coste": 1620, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 227, "nombre": "Pasta picante", "coste": 90, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 228, "nombre": "Pastel de frutas", "coste": 153, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 229, "nombre": "Té con naranja", "coste": 40, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 230, "nombre": "Sopa de pimiento", "coste": 51, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 231, "nombre": "Bizcocho de piña", "coste": 63, "almacen": "", "materiaPrima": false, "fabrica": "Pastelería"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 232, "nombre": "Piña", "coste": 30, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 233, "nombre": "Zumo de piña", "coste": 38, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 234, "nombre": "S.de pepino", "coste": 35, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 235, "nombre": "Pepino", "coste": 35, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 236, "nombre": "Ramo de caramelos", "coste": 20, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 237, "nombre": "Pan de plátano", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 238, "nombre": "Berenjena asada", "coste": 34, "almacen": "", "materiaPrima": false, "fabrica": "Barbacoa"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 239, "nombre": "Berenjena", "coste": 40, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 240, "nombre": "Batido de pepino", "coste": 34, "almacen": "", "materiaPrima": false, "fabrica": "Licuadora"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 241, "nombre": "Sopa de brocolí", "coste": 63, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 242, "nombre": "Pasta con brocolí", "coste": 60, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 243, "nombre": "Brocolí", "coste": 80, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 245, "nombre": "Zumo de sandía", "coste": 51, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 246, "nombre": "Sandía", "coste": 300, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 247, "nombre": "Té helado", "coste": 30, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 248, "nombre": "Tostada de queso de cabra", "coste": 42, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 249, "nombre": "Ramo delicado", "coste": 30, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 250, "nombre": "Tortitas de plátano", "coste": 51, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 251, "nombre": "Vela floral", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 252, "nombre": "Mermelada de ciruela", "coste": 255, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 253, "nombre": "Ciruela", "coste": 1920, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 254, "nombre": "Banana split", "coste": 178, "almacen": "", "materiaPrima": false, "fabrica": "Heladería"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 255, "nombre": "Té de menta", "coste": 35, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 257, "nombre": "Crocante de sésamo", "coste": 51, "almacen": "", "materiaPrima": false, "fabrica": "Caramelos"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 259, "nombre": "Pastel de berenjena", "coste": 38, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 260, "nombre": "Fondue de Chocolate", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": "Fondue"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 261, "nombre": "Chocolate", "coste": 1020, "almacen": "", "materiaPrima": false, "fabrica": "Caramelos"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 262, "nombre": "Té de manzana y jengibre", "coste": 30, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 263, "nombre": "Jengibre", "coste": 150, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 265, "nombre": "Fondue de bacon", "coste": 30, "almacen": "", "materiaPrima": false, "fabrica": "Fondue"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 266, "nombre": "Pan de ajo", "coste": 12, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 267, "nombre": "Ensalada de remolacha", "coste": 38, "almacen": "", "materiaPrima": false, "fabrica": "Ensaladas"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 268, "nombre": "Remolacha", "coste": 40, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 269, "nombre": "Chiles fritos", "coste": 40, "almacen": "", "materiaPrima": false, "fabrica": "Freiduría"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 270, "nombre": "Salteado de tofu", "coste": 75, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 271, "nombre": "Sésamo", "coste": 60, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 272, "nombre": "Ensalada con setas", "coste": 51, "almacen": "", "materiaPrima": false, "fabrica": "Ensaladas"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 273, "nombre": "Setas", "coste": 20, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 274, "nombre": "Brocheta de pescado", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": "Barbacoa"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 275, "nombre": "Fondue de Queso", "coste": 20, "almacen": "", "materiaPrima": false, "fabrica": "Fondue"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 276, "nombre": "Batido de cacao", "coste": 34, "almacen": "", "materiaPrima": false, "fabrica": "Licuadora"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 277, "nombre": "Empanadas de manzana", "coste": 20, "almacen": "", "materiaPrima": false, "fabrica": "Freiduría"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 278, "nombre": "Patatas con bacon", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 279, "nombre": "S. Cacahuete y Mermelada", "coste": 21, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 280, "nombre": "Verduras asadas", "coste": 21, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 281, "nombre": "Pasta con setas", "coste": 75, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 283, "nombre": "Pescado picante", "coste": 90, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 284, "nombre": "Arroz frito", "coste": 60, "almacen": "", "materiaPrima": false, "fabrica": "Wok"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 285, "nombre": "Dónut Clásico", "coste": 15, "almacen": "", "materiaPrima": false, "fabrica": "Donuterï¿½a"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 286, "nombre": "Dónut crocanti", "coste": 30, "almacen": "", "materiaPrima": false, "fabrica": "Donuterï¿½a"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 287, "nombre": "Dónut con crema", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": "Donuterï¿½a"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 288, "nombre": "Dónut con bacon", "coste": 30, "almacen": "", "materiaPrima": false, "fabrica": "Donuterï¿½a"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 289, "nombre": "Dónut con virutas", "coste": 20, "almacen": "", "materiaPrima": false, "fabrica": "Donuterï¿½a"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 290, "nombre": "Mascarilla de miel", "coste": 90, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 292, "nombre": "Jabón exfoliante", "coste": 60, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 293, "nombre": "Loción de limón", "coste": 75, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 294, "nombre": "Jabón de miel", "coste": 60, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 295, "nombre": "Batido de ciruela", "coste": 29, "almacen": "", "materiaPrima": false, "fabrica": "Licuadora"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 296, "nombre": "Pastel de setas", "coste": 51, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 297, "nombre": "Col", "coste": 45, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 298, "nombre": "Ramo de aniversario", "coste": 20, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 299, "nombre": "Sopa de col", "coste": 76, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 300, "nombre": "Lirios", "coste": 90, "almacen": "Silo", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 301, "nombre": "Galleta de jengibre", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": "PanaderÃ­a"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 302, "nombre": "Dï¿½nut relleno", "coste": 35, "almacen": "", "materiaPrima": false, "fabrica": "Donuterï¿½a"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 303, "nombre": "Rollo de chocolate", "coste": 76, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 304, "nombre": "Cacahuetes garrapiñados", "coste": 34, "almacen": "", "materiaPrima": false, "fabrica": "Caramelos"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 305, "nombre": "Kinchi", "coste": 255, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 306, "nombre": "Velas coloridas", "coste": 93, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 307, "nombre": "Aperitvo salado", "coste": 38, "almacen": "", "materiaPrima": false, "fabrica": "Palomitera"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 308, "nombre": "Pescado en lata", "coste": 187, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 309, "nombre": "Batido de cacahuete", "coste": 85, "almacen": "", "materiaPrima": false, "fabrica": "Heladería"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 310, "nombre": "Cacahuetes", "coste": 420, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 312, "nombre": "Fruta deshidratada", "coste": 153, "almacen": "", "materiaPrima": false, "fabrica": "Conservas"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 313, "nombre": "Zumo de maracuyá", "coste": 38, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 314, "nombre": "Ensalada de col", "coste": 63, "almacen": "", "materiaPrima": false, "fabrica": "Ensaladas"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 315, "nombre": "Mermelada de maracuyá", "coste": 272, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 316, "nombre": "Tarta de chocolate", "coste": 63, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 317, "nombre": "Chocolatinas fritas", "coste": 15, "almacen": "", "materiaPrima": false, "fabrica": "Freiduría"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 318, "nombre": "Pimientos rellenos", "coste": 17, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 319, "nombre": "Vinagreta de maracuyá", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 320, "nombre": "Ramo de verduras", "coste": 15, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 321, "nombre": "Pepinillos", "coste": 204, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 322, "nombre": "Batido de sésamo negro", "coste": 38, "almacen": "", "materiaPrima": false, "fabrica": "Licuadora"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 323, "nombre": "Algodón de Azúcar", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": "Caramelos"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 324, "nombre": "Fideos con salsa de cacahuete", "coste": 45, "almacen": "", "materiaPrima": false, "fabrica": "Wok"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 325, "nombre": "Sopa de setas", "coste": 68, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 326, "nombre": "Tarta de maracuyá", "coste": 42, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 327, "nombre": "Helado de sésamo", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 328, "nombre": "Helado de coco", "coste": 12, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 329, "nombre": "Zumo de mango", "coste": 42, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 330, "nombre": "Batido tropical", "coste": 34, "almacen": "", "materiaPrima": false, "fabrica": "Licuadora"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 331, "nombre": "Wrap de humus", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 332, "nombre": "Humus", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 333, "nombre": "Zumo de guayaba", "coste": 46, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 334, "nombre": "Pastel de granada", "coste": 108, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 335, "nombre": "Fudge de menta", "coste": 150, "almacen": "", "materiaPrima": false, "fabrica": "Fudge"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 336, "nombre": "Fudge de chocolate", "coste": 120, "almacen": "", "materiaPrima": false, "fabrica": "Fudge"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 337, "nombre": "Bolas de arroz", "coste": 45, "almacen": "", "materiaPrima": false, "fabrica": "Sushi"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 338, "nombre": "Yogur tropical", "coste": 60, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 339, "nombre": "Yogur", "coste": 120, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 340, "nombre": "Affogato", "coste": 17, "almacen": "", "materiaPrima": false, "fabrica": "Heladería"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 341, "nombre": "Estofado de chile", "coste": 120, "almacen": "", "materiaPrima": false, "fabrica": "Estofados"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 342, "nombre": "Falafel", "coste": 55, "almacen": "", "materiaPrima": false, "fabrica": "Freiduría"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 343, "nombre": "Fondue tropical", "coste": 35, "almacen": "", "materiaPrima": false, "fabrica": "Fondue"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 344, "nombre": "Tetera", "coste": 240, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 345, "nombre": "Compota de Guayaba", "coste": 221, "almacen": "", "materiaPrima": false, "fabrica": "Conservas"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 346, "nombre": "Fudge de chile", "coste": 170, "almacen": "", "materiaPrima": false, "fabrica": "Fudge"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 347, "nombre": "Bolitas de coco", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": "PanaderÃ­a"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 348, "nombre": "Sorbete de frutas", "coste": 51, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 349, "nombre": "Samosa", "coste": 75, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 350, "nombre": "Maceta con flor", "coste": 220, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 351, "nombre": "Taza de arcilla", "coste": 200, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 352, "nombre": "Fudge de cacahuete", "coste": 90, "almacen": "", "materiaPrima": false, "fabrica": "Fudge"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 353, "nombre": "Quiché de espárragos", "coste": 102, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 354, "nombre": "Espárragos a a la parrilla", "coste": 63, "almacen": "", "materiaPrima": false, "fabrica": "Barbacoa"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 355, "nombre": "Té de granada", "coste": 35, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 356, "nombre": "Tortilla de queso", "coste": 90, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 358, "nombre": "Haz de trigo", "coste": 26, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 359, "nombre": "Comida de cerdos", "coste": 17, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 360, "nombre": "Yogur de fresa", "coste": 40, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 361, "nombre": "Tortilla colorida", "coste": 60, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 362, "nombre": "Sopa de espárragos", "coste": 60, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 363, "nombre": "Fudge de limón", "coste": 110, "almacen": "", "materiaPrima": false, "fabrica": "Fudge"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 364, "nombre": "Tortilla de primavera", "coste": 40, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 365, "nombre": "Estofado de invierno", "coste": 140, "almacen": "", "materiaPrima": false, "fabrica": "Estofados"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 368, "nombre": "Colgante floral", "coste": 51, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 369, "nombre": "Estofado de garbanzos", "coste": 90, "almacen": "", "materiaPrima": false, "fabrica": "Estofados"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 370, "nombre": "Tortilla de arroz", "coste": 120, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 371, "nombre": "Cupcake", "coste": 40, "almacen": "", "materiaPrima": false, "fabrica": "Cupcakes"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 372, "nombre": "C.de guayaba", "coste": 70, "almacen": "", "materiaPrima": false, "fabrica": "Cupcakes"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 373, "nombre": "C.Tropical", "coste": 90, "almacen": "", "materiaPrima": false, "fabrica": "Cupcakes"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 374, "nombre": "C.de galleta", "coste": 120, "almacen": "", "materiaPrima": false, "fabrica": "Cupcakes"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 375, "nombre": "Tortilla de patata", "coste": 75, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 376, "nombre": "Gofres normales", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 377, "nombre": "G.con frutos rojos", "coste": 35, "almacen": "", "materiaPrima": false, "fabrica": "Gofrera"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 378, "nombre": "Ramo colorido", "coste": 20, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 379, "nombre": "Gofres con chocolate", "coste": 40, "almacen": "", "materiaPrima": false, "fabrica": "Gofrera"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 380, "nombre": "Gofres frutos rojos", "coste": 35, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 381, "nombre": "Ensalada de naranja", "coste": 38, "almacen": "", "materiaPrima": false, "fabrica": "Ensaladas"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 384, "nombre": "Cerdo de chocolate", "coste": 60, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 385, "nombre": "Cabra de chocolate", "coste": 90, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 386, "nombre": "G.de huevos con bacon", "coste": 45, "almacen": "", "materiaPrima": false, "fabrica": "Gofrera"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 387, "nombre": "Aceite esencial de limón", "coste": 10, "almacen": "", "materiaPrima": false, "fabrica": "Aceites esenciales"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 388, "nombre": "Aceite esencial de menta", "coste": 15, "almacen": "", "materiaPrima": false, "fabrica": "Aceites esenciales"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 389, "nombre": "Bol de desayuno", "coste": 50, "almacen": "", "materiaPrima": false, "fabrica": "Gachas"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 390, "nombre": "Avena", "coste": 6, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 391, "nombre": "Espárragos", "coste": 360, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 392, "nombre": "Coco", "coste": 1440, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 393, "nombre": "Guayaba", "coste": 1440, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 394, "nombre": "Garbanzos", "coste": 60, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 395, "nombre": "Mango", "coste": 1920, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 396, "nombre": "Maracuyá", "coste": 60, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 397, "nombre": "Granada", "coste": 1620, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 398, "nombre": "Ajos", "coste": 30, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 399, "nombre": "Arcilla", "coste": 110, "almacen": "SILO", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 400, "nombre": "Barritas de piña y coco", "coste": 34, "almacen": "", "materiaPrima": false, "fabrica": "PanaderÃ­a"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 401, "nombre": "Gachas con manzana", "coste": 20, "almacen": "", "materiaPrima": false, "fabrica": "Gachas"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 402, "nombre": "Gachas dulces", "coste": 45, "almacen": "", "materiaPrima": false, "fabrica": "Gachas"}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 403, "nombre": "Gachas recién hechas", "coste": 35, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 404, "nombre": "Aceite esencial de jengibre", "coste": 20, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 405, "nombre": "Jabón lujoso", "coste": 70, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 406, "nombre": "Batido de vainilla", "coste": 45, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 407, "nombre": "Batido de moca", "coste": 30, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 409, "nombre": "Batido de frutas", "coste": 35, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 415, "nombre": "Aceite esencial de manzanilla", "coste": 10, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 416, "nombre": "Té de manzanilla", "coste": 20, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 417, "nombre": "Manzanilla", "coste": 20, "almacen": "", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 418, "nombre": "Difusor fresco", "coste": 20, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 419, "nombre": "Almohada relajante", "coste": 51, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 420, "nombre": "Difusor relajante", "coste": 25, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 421, "nombre": "Perfume cítrico", "coste": 15, "almacen": "", "materiaPrima": false, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 422, "nombre": "Arándanos", "coste": 840, "almacen": "", "materiaPrima": true, "fabrica": ""}));
await addDoc(this.productosCollectionRef, new ProductoModel({"id": 423, "nombre": "G.de Arándanos", "coste": 42, "almacen": "", "materiaPrima": false, "fabrica": ""}));console.log("S'acabó");    
  }

  /** Devuelve todos los productos */
  async listarProductos(filtro: ProductoModel): Promise<ProductoModel[]>
  {
    const resultado: ProductoModel[] = [];
    const q = query(this.productosCollectionRef, orderBy("nombre"));
    const qS: QuerySnapshot= await getDocs(q);
    qS.forEach((doc: DocumentSnapshot) => {  
                          /*const datosProducto = doc.data() as ProductoModel; // <-- ¡Aquí está la clave!
                          console.log(datosProducto.getNombre());*/
                          console.log("Documento ID: " + doc.data());
                          const datosProducto = doc.data() as ProductoModel;
                          datosProducto.cProductoId = doc.id; // Asignar el ID del documento al campo cProductoId
                          resultado.push(datosProducto);
                          //console.log(resultado[0].cProductoId);

                        });
    return resultado;
  }




  async modificarTengo(nombre: string, nuevoTengo: number)
  {
    console.log("*******************************Buscamos productos con nombre: ************" + nombre);
    const q = query(this.productosCollectionRef, where('nombre', '==', nombre));

    const querySnapshot = await getDocs(q);
    
    console.log("La query ha devuelto: " + querySnapshot.size);
    for (const producto of querySnapshot.docs) 
    {
      console.log("Id del producto" + producto.id);
      const docRef = doc(this.productosCollectionRef, producto.id);
      console.log("docRef del producto" + docRef.id);
      await updateDoc(docRef, {"tengo": nuevoTengo });
    }
    
  }
  async modificarTengoPorId(id: string, nuevoTengo: number)
  {
    console.log("*******************************Buscamos productos con id: ************" + id);
    const docRef = doc(this.productosCollectionRef, id);
    await updateDoc(docRef, {"tengo": nuevoTengo });
  }

  async tengoANull()
  {
    console.log("Allá vamos");
    const q = query(this.productosCollectionRef, where('materiaPrima', '==', false));

    const querySnapshot = await getDocs(q);
    
    console.log("La query ha devuelto: " + querySnapshot.size);
    for (const producto of querySnapshot.docs) 
    {
      console.log("Id del producto" + producto.id);
      const docRef = doc(this.productosCollectionRef, producto.id);
      console.log("docRef del producto" + docRef.id);
      await updateDoc(docRef, {"tengo": -1 });
    }
    
  }  

    async materiasPrimasANueve()
  {
    console.log("Allá vamos");
    const q = query(this.productosCollectionRef, where('materiaPrima', '==', true));

    const querySnapshot = await getDocs(q);
    
    console.log("La query ha devuelto: " + querySnapshot.size);
    for (const producto of querySnapshot.docs) 
    {
      console.log("Id del producto" + producto.id);
      const docRef = doc(this.productosCollectionRef, producto.id);
      console.log("docRef del producto" + docRef.id);
      await updateDoc(docRef, {"tengo": 9 });
    }
    
  }  

  async obtenerNombreProductoPorId(id: string): Promise<ProductoModel>
  {
    const docRef = doc(this.productosCollectionRef, id);
    const docSnap = await getDoc(docRef); 
    if (docSnap.exists()) {
      const datosProducto = docSnap.data() as ProductoModel;
      return datosProducto;
    } else {
      console.log("No such document!");
      return new ProductoModel({id: 0, nombre: 'No existe', coste: 0, almacen: '', materiaPrima: false, fabrica: ''});
    }
  }

  async obtenerTengoPorId(id: string): Promise<number>
  {
    const docRef = doc(this.productosCollectionRef, id);
    const docSnap = await getDoc(docRef); 
    if (docSnap.exists()) {
      const datosProducto = docSnap.data() as ProductoModel;
      return datosProducto.tengo!;
    } else {
      console.log("No such document!");
      return -1;
    }

 } 

 async obtenerCosteProductoPorId(id: string): Promise<number>
  {
    const docRef = doc(this.productosCollectionRef, id);
    const docSnap = await getDoc(docRef); 
    if (docSnap.exists()) 
    {
      const datosProducto = docSnap.data() as ProductoModel;
      return datosProducto.coste;
    }
    else
    {
      console.log("No such document!");
      return -1;
    }
  }
}

  
