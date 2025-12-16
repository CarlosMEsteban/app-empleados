import { Injectable } from '@angular/core';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, deleteDoc, doc, DocumentSnapshot, getDoc, getDocs, getFirestore, limit, or, orderBy, query, QuerySnapshot, updateDoc, where, writeBatch } from 'firebase/firestore';
import {firebaseConfig} from '../CONSTANTES';
import { IngredienteService } from '../ingrediente/ingrediente-service';
import { ProductoService } from '../producto/producto.service';
import { comoGastoModel } from './como-gasto.model';
import { ProductoModel } from '../producto/producto.model';

@Injectable({
  providedIn: 'root'
})
export class comoGastoService 
{
  productoServicio: ProductoService;
  ingredienteServicio: IngredienteService;
  constructor(productoServicio: ProductoService, ingredienteServicio: IngredienteService)
  {
    this.productoServicio = productoServicio;
    this.ingredienteServicio = ingredienteServicio;
  }

  async comoGasto(cProductoId: string): Promise<comoGastoModel[]>
  {
    let resultado: comoGastoModel[] = [];
    let lProductos = this.productoServicio.listarProductos(new ProductoModel({}));
    (await lProductos).forEach(async producto => 
      // Recorro todos los productos 
    {
      this.ingredienteServicio.ingredientesDeProducto(producto.cProductoId).then(ingredientes =>
      // Consigo los ingredientes de cada producto
      {
        if (ingredientes.length > 0)
        {
          (ingredientes).forEach(ingrediente => 
          // Recorro los ingredientes de cada producto
          {
            if (ingrediente.cProductoNecesitadoId === cProductoId)
            {
              // Si el ingrediente coincide con el producto buscado, añado el gasto
              let comoGasto = new comoGastoModel({
                nombre: producto.getNombre(),
                cuantoGasto: ingrediente.cantidad
              });
              resultado.push(comoGasto);
            }
          });
          
        }
      });
    } );

    return resultado;
  }
}

  
