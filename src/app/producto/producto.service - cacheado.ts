import { Injectable } from '@angular/core';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, deleteDoc, doc, DocumentSnapshot, getDoc, getDocs, getFirestore, limit, or, orderBy, query, QuerySnapshot, updateDoc, where, writeBatch } from 'firebase/firestore';
import { productoConverter, ProductoModel } from './producto.model';
import { Fechas } from '../util/fechas';
import {firebaseConfig} from '../CONSTANTES';
import { IngredienteModel } from '../ingrediente/ingrediente.model';
import { IngredienteService } from '../ingrediente/ingrediente-service';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceCacheado {

  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(this.app);
  
  db = getFirestore(this.app);

  productosCollectionRef = collection(this.db, 'producto').withConverter(productoConverter);

  protected lProductos: ProductoModel[] = [];
  protected lIngredientes: IngredienteModel[] = [];
  protected ingredienteServicio: IngredienteService;
  protected fUltConsultaProductos: Date | null = null;
  
  constructor(ingredienteServicio: IngredienteService) 
  {
    this.ingredienteServicio = ingredienteServicio;
  }

  public async getProductos(): Promise<ProductoModel[]>
  {
    if (Fechas.haceMucho(this.fUltConsultaProductos))
      await this.accederALaBD();      
    return this.lProductos;
  }

  public async getIngredientes(): Promise<IngredienteModel[]>
  {
    if (Fechas.haceMucho(this.fUltConsultaProductos))
      await this.accederALaBD();      
    return this.lIngredientes;
  }

  private async accederALaBD()
  {
    //console.log("Obteniendo productos de Firestore");
    const lProductosProm = await this.listarProductos();
    this.lProductos = lProductosProm;
    //console.log("Ya hemos obtenido la promesa de productos" + this.lProductos.length);
    
    this.fUltConsultaProductos = new Date();
    this.lIngredientes = [];
    
    const tareas = this.lProductos.map(producto =>
    {
      if (producto.cProductoId != "" && producto.cProductoId != null)
      {
      //console.log("Obteniendo ingredientes de producto----- " + producto.cProductoId + " (" + producto.getNombre() + ")");
      this.ingredienteServicio.ingredientesDeProducto(producto.cProductoId).then(ingredientes => 
        {
          //console.log("Obteniendo ingredientes de producto " + producto.cProductoId + ": " + ingredientes.length);
          ingredientes.forEach(ingrediente => {
            //console.log("Ingrediente obtenido: " + ingrediente.cProductoNecesitadoId + " necesita " + ingrediente.cantidad + " de " );
            
            producto.ingrediente.push(ingrediente);
          });
        })
      }
    }
    );

    await Promise.all(tareas);
    
    //console.log("********Productos obtenidos: " + this.lProductos.length);
    //console.log("********Ingredientes obtenidos: " + this.lIngredientes.length);
  }

    private async listarProductos(): Promise<ProductoModel[]>
    {
      const querySnapshot = await getDocs(this.productosCollectionRef);
      const lProductosProm: ProductoModel[] = [];
      querySnapshot.forEach((document) => {
        const datosProducto = document.data() as ProductoModel;
        datosProducto.cProductoId = document.id;
        lProductosProm.push(datosProducto);
      }); 
      return lProductosProm;
    }  

    async getnombreProducto(cProductoId: string): Promise<string>
    {
      if (Fechas.haceMucho(this.fUltConsultaProductos))
        await this.accederALaBD(); 
      const producto = this.lProductos.find(p => p.cProductoId === cProductoId);
      if (producto)
        return producto.getNombre();
      else
        return "";
    }

    async modificarTengo(cProductoId: string, nuevoTengo: number)
    {
      const producto = this.lProductos.find(p => p.cProductoId === cProductoId);
      if (producto)
      {
        producto.setTengo(nuevoTengo);
        const productoDocRef = doc(this.db, 'producto', producto.cProductoId).withConverter(productoConverter);
        updateDoc(productoDocRef, { tengo: nuevoTengo });
      }
    }

  modificarTengoDeIngredientes(cProductoId: string, cantidad: number) 
  {
    const producto = this.lProductos.find(p => p.cProductoId === cProductoId);
    if (producto && !producto.esMateriaPrima() && producto.ingrediente.length > 0)
    // Hemos encontrado el producto, no es materia prima y tiene ingredientes, así que hay que restar lo que ha fabricado a lo que tenía y a lo que ha fabricado
    {
      let cantidadFabricada = cantidad - producto.getTengo();
      if (cantidadFabricada <= 0)
      // No ha hecho falta fabricar nada por que la lo tenía
      {
        this.modificarTengo(producto.cProductoId, producto.getTengo() - cantidad);
      }
      else      // Ha hecho falta fabricar algo, así que se lo restamos a lo que tenía y a lo que ha fabricado
      {
        this.modificarTengo(producto.cProductoId, 0);
        producto.ingrediente.forEach(ingrediente => 
          {
            this.modificarTengoDeIngredientes(ingrediente.cProductoNecesitadoId, ingrediente.cantidad * cantidadFabricada);
          });
      }

    }
  }  

}

  
