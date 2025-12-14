import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PedidoModel } from '../pedido/pedido.model';
import { OrdenPedidosProductosHijo } from '../orden-pedidos-productos-hijo/orden-pedidos-productos-hijo';
import { ProductosDePedidoModel } from '../productos-de-pedido/productosDePedido.model';
import { ProductoDePedidoService } from '../producto-de-pedido/producto-de-pedido.service';
import { NgFor, NgIf, } from '@angular/common';
import { ProductoService } from '../producto/producto.service';
import { ProductoModel } from '../producto/producto.model';
import { IngredienteModel } from '../ingrediente/ingrediente.model';
import { PedidoService } from '../pedido/pedido-service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-orden-pedidos-hijo',
  imports: [OrdenPedidosProductosHijo, NgFor, FormsModule, NgIf],
  templateUrl: './orden-pedidos-hijo.html',
  styleUrl: './orden-pedidos-hijo.css'
})
export class OrdenPedidosHijo 
{
  @Output() calcularBfo = new EventEmitter<void>();
  @Input() pedido!: PedidoModel;
  @Input() lProductos!: ProductoModel[];
  @Input() lIngredientes!: IngredienteModel[];

  lProductosDePedido: ProductosDePedidoModel[] = [];

  productoDePedidoServicio: ProductoDePedidoService;
  productoServicio: ProductoService;
  pedidoServicio: PedidoService;

  aEliminar: boolean = false;

  constructor(productoDePedidoServicio: ProductoDePedidoService, 
              productoServicio: ProductoService,
              pedidoServicio: PedidoService)
  {
    this.productoDePedidoServicio = productoDePedidoServicio;
    this.productoServicio = productoServicio;
    this.pedidoServicio = pedidoServicio;
  }

  ngOnInit()
  { 
    console.clear();
    if (this.pedido?.id)
      this.cargarProductosDePedido();
  }


  private async cargarProductosDePedido(): Promise<void> 
  {

    if (!this.pedido?.id) {
      this.lProductosDePedido = [];
      return;
    }
    try {
      this.lProductosDePedido = await this.productoDePedidoServicio.obtenerProductosDePedidoPorPedidoId(this.pedido.id);
      // A cada producto le ponemos su nombre de producto
      this.lProductosDePedido.forEach(pdp =>{
        let producto = this.lProductos.find(p => p.cProductoId == pdp.poductoId);
        if (producto == undefined)
          pdp.nombreProducto = "Nombre de producto no encontrado";
        else
        {
          pdp.nombreProducto = producto.nombre;
          pdp.tengo = producto.tengo;
        }
      })
      
    } catch (err) {
      console.error('Error cargando productos del pedido', err);
      this.lProductosDePedido = [];
    }

    console.log("Pedido: " + this.pedido.id+ " tiene "+  this.lProductosDePedido.length + " productos")
 }

  async tratarPedido()
  {
    console.log(this.pedido.id);
    this.lProductosDePedido.forEach(pdp =>
    {
      this.fabricar(pdp.poductoId, pdp.cantidad);
    });

  this.pedidoServicio.aMenosUno(this.pedido.id);

    console.log("Aquítengo que poder llamar al método calcularBfoDeTodosLosPedidos")
    this.calcularBfo.emit();
    /*await this.obtenerTodosLosDatos();
    this.pedidoServicio.calcularBfoDeTodosLosPedidos(this.pedidos, 
                                                      this.productosDePedido, 
                                                      this.ingredientes,
                                                      this.productos);
    await this.ordenarPorBfo();*/


  }

 

  private fabricar(cProductoId: string, cantidad: number)
  {
      let producto: ProductoModel | undefined = this.lProductos.find(p => p.cProductoId == cProductoId);
      if (producto == undefined)
        throw new Error("Se ha pedido un producto no existente");
      else
      {
        if (cantidad <= producto.tengo)
        // Tengo más o lo mismo de lo que necesito
        {
          producto.tengo -= cantidad;          
        }
        else
        // Tengo menos de lo que necesito
        {
          let hayQuefabricar = cantidad - producto.tengo;
          let lIngredientesNecesarios: IngredienteModel[] | undefined = this.lIngredientes.filter(i => i.cProductoNecesitaId == cProductoId); // Obtenemos los ingredientes de este producto
          if (lIngredientesNecesarios != undefined)
          {
            lIngredientesNecesarios.forEach(ingrediente => 
              {
                let cantidadDeEsteProducto = hayQuefabricar * ingrediente.cantidad;
                this.fabricar(ingrediente.cProductoNecesitadoId, cantidadDeEsteProducto);            
              });
          }

          producto.tengo =  0;          
        }
        this.productoServicio.modificarTengoPorId(producto.cProductoId, producto.tengo);
      }

  }

  async eliminarFase2()
  {
    if (window.confirm("¿Está seguro de que desea eliminar este pedido y todos sus productos?"))
    {
      await this.pedidoServicio.eliminarPedido(this.pedido.id);
      this.calcularBfo.emit();
    }
    
  }


}
