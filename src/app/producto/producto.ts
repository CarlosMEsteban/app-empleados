import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProductoModel } from './producto.model';
import { ProductoService } from './producto.service';
import { ProductoHijo } from '../producto-hijo/producto-hijo';
import { IngredienteService } from '../ingrediente/ingrediente-service';
import { IngredienteModel } from '../ingrediente/ingrediente.model';

@Component({
  selector: 'app-producto',
  imports: [ProductoHijo, NgFor],
  templateUrl: './producto.html',
  styleUrl: './producto.css'
})
export class Producto {
  productoService: ProductoService;
  ingredienteService: IngredienteService;
  lProductos : ProductoModel[] = [];

  //mProductosNecesitados: Map<string, ProductoModel> = new Map<string, ProductoModel>();

  constructor(productoService: ProductoService, ingredienteService: IngredienteService)
  { 
    this.productoService = productoService;
    this.ingredienteService = ingredienteService;
  }

  

  anadirProducto()
  {
      /*const nuevoProducto = new ProductoModel(
          999,
          "Prueba",
          1,
          2,
          "Alamacenenro",
          false,
          3,
          "Fabric"
      );*/
      const nuevoProducto2 = new ProductoModel(
        {
          "id": 999,
          "nombre": "Prueba",
          "coste": 1,
          "tengo": 2,
          "almacen": "Alamacenenro",
          "materiaPrima": "N",
          "cantidadInicial": 3,
          "fabrica": "Fabric"
        }
      )
      const nuevoProducto = new ProductoModel(
        {
          "id": 999,
          "nombre": "Prueba",
          "coste": 5,
          "tengo": 2,
          "almacen": "Alamacenenro",
          "materiaPrima": "S",
          "cantidadInicial": 3,
          "fabrica": "Fabric"
        }
      )

  

//constructor(id: number = -1, 
// nombre: string, 
// coste: number, 
// tengo: number, 
// almacen: string, 
// materiaPrima: boolean, 
// cantidadInicial: number, 
// fabrica: string )           
    this.productoService.agregarService(nuevoProducto);
  }

  cargarTodosProdutos()
  {

    this.productoService.cargarTodosProdutos();
  }

  listarProductos()
  {
   this.productoService.listarProductos(new ProductoModel({})).then(lProductosDevueltos =>
            {
              console.log("lProductosDevueltos: " + lProductosDevueltos.length);
              this.lProductos = lProductosDevueltos;
              console.log("lProductos1: " + this.lProductos.length);
            }
            );
    console.log("lProductos2: " + this.lProductos.length);
  }

  async listarProductosNecesitados()
  {
    console.clear();
    console.log("listando productos necesitados...");
    //this.mProductosNecesitados.clear();
    this.productosNecesitados().then( (mProductosNecesitados: Map<string, ProductoModel>) => 
      {
        console.log("Productos necesitados encontrados: " + mProductosNecesitados.size);
        this.lProductos = Array.from(mProductosNecesitados.values());
        console.log("lProductos a listar: " + this.lProductos.length);
      });
    

  }
      
  /** Obtiene sólo los productos que son necesitados para otros productos y no son materias primas */
  /*async productosNecesitados(): Promise<Map<string, ProductoModel>>
  {
    console.clear();
    let resultado : Map<string, ProductoModel> = new Map<string, ProductoModel>();
    
    const todosLosProductos = await this.productoService.listarProductos(new ProductoModel({}));
    const mProductos: Map<string, ProductoModel> = this.transformarEnMapa(todosLosProductos as ProductoModel[]);
    // Recorremos todos los productos
    todosLosProductos.forEach( producto => 
    // Por cada producto
    {
      // Obtenemos los ingredientes de ese producto
      let lIngredientes: IngredienteModel[] = await this.ingredientesDeProducto(producto.cProductoId);
      // Recorremos los ingredientes
      lIngredientes.forEach( ingrediente => 
      // Por cada ingrediente
      {
        //console.log("   Ingrediente: " + ingrediente.cProductoNecesitadoId );
        if (! mProductos.get(ingrediente.cProductoNecesitadoId)?.esMateriaPrima() && ! resultado.has(ingrediente.cProductoNecesitadoId))
        // Si el producto necesitado no es materia prima y no está ya en el resultado
        {
          resultado.set(ingrediente.cProductoNecesitadoId, mProductos.get(ingrediente.cProductoNecesitadoId)!);
          //console.log("      --> Añadido producto necesitado: " + mProductos.get(ingrediente.cProductoNecesitadoId)?.getNombre());
        }
      });
    });
  }*/
   async productosNecesitados(): Promise<Map<string, ProductoModel>> {
    const resultado: Map<string, ProductoModel> = new Map<string, ProductoModel>();

    // Obtener todos los productos
    const lProductosDevueltos = await this.productoService.listarProductos(new ProductoModel({}));
    const mProductos: Map<string, ProductoModel> = this.transformarEnMapa(lProductosDevueltos);

    // Para cada producto, leer su subcolección de ingredientes concurrentemente
    const tareas = lProductosDevueltos.map(async (producto) => {
      const lIngredientes = await this.ingredienteService.ingredientesDeProducto(producto.cProductoId);
      lIngredientes.forEach(ingrediente => {
        const idNecesitado = ingrediente.cProductoNecesitadoId;
        const productoNecesitado = mProductos.get(idNecesitado);
        if (productoNecesitado?.getNombre() == "Aceitunas")
          console.log("Ingrediente necesario: " + productoNecesitado?.getNombre() + " materiaPrima: " + productoNecesitado?.materiaPrima    );
        if (productoNecesitado && !productoNecesitado.esMateriaPrima() && !resultado.has(idNecesitado)) {
          resultado.set(idNecesitado, productoNecesitado);
        }
      });
    });

    // Esperar a que terminen todas las lecturas de ingredientes
    await Promise.all(tareas);

    // devolver el mapa ya completo
    return resultado;
  }

  private async ingredientesDeProducto(cProductoNecesitaId: string): Promise<IngredienteModel[]>
  {
    return await this.ingredienteService.ingredientesDeProducto(cProductoNecesitaId);
  }

  private transformarEnMapa(lProductosDevueltos: ProductoModel[]): Map<string, ProductoModel>
  {
    let mProductos: Map<string, ProductoModel> = new Map<string, ProductoModel>();
    lProductosDevueltos.forEach( producto => 
      {
        mProductos.set(producto.cProductoId, producto);
      });
      return mProductos;
  }
      
  tengoANull()
  {
    this.productoService.tengoANull();
  }
  materiasPrimasANueve()
  {
    this.productoService.materiasPrimasANueve();
  }  

  anadirTodosIngredientes()
  {
    
    this.ingredienteService.anadirTodoIngredientes();
  }
}
