import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProductoModel } from './producto.model';
import { ProductoService } from './producto.service';
import { ProductoHijo } from '../producto-hijo/producto-hijo';
import { IngredienteService } from '../ingrediente/ingrediente-service';
import { IngredienteModel } from '../ingrediente/ingrediente.model';
import { PedidoService } from '../pedido/pedido-service';

@Component({
  selector: 'app-producto',
  imports: [ProductoHijo, NgFor, NgIf],
  templateUrl: './producto.html',
  styleUrl: './producto.css'
})
export class Producto {
  productoServicio: ProductoService;
  ingredienteServicio: IngredienteService;
  pedidoServicio: PedidoService;
  lProductos : ProductoModel[] = [];
  titulo: string = "Gestión de Productos";
  bMostrarBotonesEspeciales: boolean = false;

  //mProductosNecesitados: Map<string, ProductoModel> = new Map<string, ProductoModel>();

  constructor(productoServicio: ProductoService, 
              ingredienteServicio: IngredienteService,
              pedidoServicio: PedidoService)
  { 
    this.productoServicio = productoServicio;
    this.ingredienteServicio = ingredienteServicio;
    this.pedidoServicio = pedidoServicio;
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
          "materiaPrima": false,
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
          "materiaPrima": true,
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
    this.productoServicio.agregarService(nuevoProducto);
  }

  cargarTodosProdutos()
  {
    console.clear();
    if (window.confirm("¿Cargamos todos los productos?") )
    {
      if (window.confirm("¿Estás seguro? Esta operación puede tardar varios segundos...") )
      {
        this.productoServicio.cargarTodosProdutos();
      }
      else
      {
        console.log("Ha aceptado sólo la primera vez.");
      }
    }
    else
    {
      console.log("No ha aceptado ninguna vez");
    }    
  
  }

  listarProductos()
  {
  
    
   this.productoServicio.listarProductos(new ProductoModel({})).then(lProductosDevueltos =>
            {
              console.log("lProductosDevueltos: " + lProductosDevueltos.length);
              this.lProductos = lProductosDevueltos;
              console.log("lProductos1: " + this.lProductos.length);
            }
            );
    console.log("lProductos2: " + this.lProductos.length);
    this.titulo = "Listado de TODOS los Productos";
  }

  async listarProductosNecesitados()
  {
    console.clear();
    console.log("listando productos necesitados...");
    //this.mProductosNecesitados.clear();
    this.productosNecesitados().then( (mProductosNecesitados: Map<string, ProductoModel>) => 
      {
        console.log("Productos necesitados encontrados: " + mProductosNecesitados.size);
        let lProductosSinOrdenar = Array.from(mProductosNecesitados.values());
        this.lProductos= lProductosSinOrdenar.sort((a, b) => a.nombre.localeCompare(b.nombre));
        console.log("lProductos a listar: " + this.lProductos.length);
      });
    
    this.titulo = "Listado de Productos Necesitados (no materias primas)";
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
    const lProductosDevueltos = await this.productoServicio.listarProductos(new ProductoModel({}));
    const mProductos: Map<string, ProductoModel> = this.transformarEnMapa(lProductosDevueltos);

    // Para cada producto, leer su subcolección de ingredientes concurrentemente
    const tareas = lProductosDevueltos.map(async (producto) => {
      const lIngredientes = await this.ingredienteServicio.ingredientesDeProducto(producto.cProductoId);
      lIngredientes.forEach(ingrediente => {
        const idNecesitado = ingrediente.cProductoNecesitadoId;
        const productoNecesitado = mProductos.get(idNecesitado);
        if (productoNecesitado?.getNombre() == "Aceitunas")
          console.log("Ingrediente necesario: " + productoNecesitado?.getNombre() + " materiaPrima: " + productoNecesitado?.materiaPrima    );
        if (productoNecesitado && !productoNecesitado.materiaPrima && !resultado.has(idNecesitado)) {
          resultado.set(idNecesitado, productoNecesitado);
        }
      });
    });

    // Esperar a que terminen todas las lecturas de ingredientes
    await Promise.all(tareas);

    // devolver el mapa ya completo
    return resultado;
  }

  eliminarTodosProductos()
  {
    console.clear();
    if (window.confirm("¿Eliminar TODOS los productos?") )
      if (window.confirm("¿Estás seguro? Esta operación no se puede deshacer...") )
      {
        console.log("Eliminando todos los productos...");
        this.productoServicio.eliminarTodosProductos();
        console.log("Eliminación de productos solicitada.");
      }
  }

  private async ingredientesDeProducto(cProductoNecesitaId: string): Promise<IngredienteModel[]>
  {
    return await this.ingredienteServicio.ingredientesDeProducto(cProductoNecesitaId);
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
    if (window.confirm("¿Poner a null el campo 'tengo' de TODOS los productos?") )
      if (window.confirm("¿Estás seguro? Esta operación no se puede deshacer...") )
        this.productoServicio.tengoANull();
  }
  materiasPrimasANueve()
  {
    if (window.confirm("¿Poner a 9 el campo 'tengo' de TODAS las materias primas?") )
      if (window.confirm("¿Estás seguro? Esta operación no se puede deshacer...") )
        this.productoServicio.materiasPrimasANueve();
  }  

  anadirTodosIngredientes()
  {
    if (window.confirm("¿Añadir TODOS los ingredientes?") )
      if (window.confirm("¿Estás seguro? Esta operación puede tardar varios segundos...") ) 
        this.ingredienteServicio.anadirTodoIngredientes();
  }


  mostrarBotonesEspeciales()
  {
    this.bMostrarBotonesEspeciales = ! this.bMostrarBotonesEspeciales;
  } 

  iniciarTengo()
  {
    if (window.confirm("¿Iniciar el proceso de poner el campo 'tengo' a su valor inicial en TODOS los productos?") )
      if (window.confirm("¿Estás seguro? Esta operación no se puede deshacer...") )
      {
        this.productoServicio.tengoANull();
        this.productoServicio.materiasPrimasANueve();
      }

  } 

  async comenzarElDia()
  {
    if (window.confirm("¿Desea comenzar un nuevo día?") )
      if (window.confirm("¿Estás seguro? Esta operación pondrá a -1 los tengo de los productos, a 9 las materias primas y eliinará todos los pedidos") )
      {
        await this.productoServicio.tengoANull();
        await this.productoServicio.materiasPrimasANueve();
        await this.pedidoServicio.eliminarTodosPedidos();
      }

    

  }   

}
