import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PedidoModel } from './pedido.model';
import { CommonModule, NgIf } from '@angular/common';
import { ProductosDePedido } from "../productos-de-pedido/productos-de-pedido";
import { PedidoService } from './pedido-service';
import { ProductosDePedidoModel } from '../productos-de-pedido/productosDePedido.model';
import { Producto } from "../producto/producto";
import { ProductoDePedidoAl } from "../producto-de-pedido-al/producto-de-pedido-al";
import { ProductoDePedidoService } from '../producto-de-pedido/producto-de-pedido.service';
import { ProductoService } from '../producto/producto.service';
import { ProductoModel } from '../producto/producto.model';


@Component({
  selector: 'app-pedido',
  imports: [FormsModule, NgIf, ProductosDePedido, Producto, CommonModule, ProductoDePedidoAl],
  templateUrl: './pedido.html',
  styleUrl: './pedido.css'
})
export class Pedido {
  @Input() pedido: PedidoModel = new PedidoModel({orden: -1, estrellas: -1, oro: -1  });
  bMostrarListaProductos: boolean = false;
  lPedidos: PedidoModel[] = [];
  lProductos: ProductosDePedidoModel[] = [];
  indicePedidoActual: number = 0;

  pedidoServicio: PedidoService;
  productoServicio: ProductoService;
  productosDePedidoServicio: ProductoDePedidoService;

  constructor(pedidoServicio: PedidoService, 
              productosDePedidoServicio: ProductoDePedidoService, 
              productoServicio: ProductoService)
  {
    this.pedidoServicio = pedidoServicio;
    this.productosDePedidoServicio = productosDePedidoServicio;
    this.productoServicio = productoServicio;

    this.pedidoServicio.obtenerPedidos().then((pedidos: PedidoModel[]) => {
      this.lPedidos = pedidos as PedidoModel[];
      this.lPedidos.sort((a, b) => a.orden - b.orden);
      this.mostrarPedidoActual();

    });
  }

  onInit() {
    console.log("OnInit Pedido");
  }

  siguientePedido() 
  {
    console.clear();
    console.log("lPedidos.length: " + this.lPedidos.length);
    console.log("indicePedidoActual: " + this.indicePedidoActual);
    if (this.indicePedidoActual < this.lPedidos.length - 1) 
    {
      this.indicePedidoActual++;
      this.mostrarPedidoActual();
      //this.pedido = this.lPedidos[this.indicePedidoActual];
      console.log("Pedido actual id: " + this.pedido.id);
    }
  }

  anteriorPedido() {
    if (this.indicePedidoActual > 0) 
    {
      this.indicePedidoActual--;
      this.mostrarPedidoActual();
      //this.pedido = this.lPedidos[this.indicePedidoActual];
    }
  }
  
  nuevoPedido() 
  {
    this.pedido = new PedidoModel({orden: -1, estrellas: -1, oro: -1  });
    this.lProductos = [];
  }

  bNuevo(): boolean
  {
    return this.pedido.id === "";
  }

  insertarPedido()
  {
    if (this.pedido.estrellas < 0 || this.pedido.oro < 0 || this.pedido.orden < 0)  
    {
      alert("Debe rellenar los datos del pedido antes de insertarlo.");
      return;
    }
    else
    {
      this.pedidoServicio.insertarPedido(this.pedido).then((id) => {
        this.pedido.id = id;  
        this.lPedidos.push(this.pedido);
        this.indicePedidoActual = this.lPedidos.length - 1; 
      }
      );
    }
  }

  mostrarProductosDePedido() 
  {
    if (this.pedido.estrellas < 0 || this.pedido.oro < 0 || this.pedido.orden < 0)
    {
      alert("Debe rellenar los datos del pedido antes de añadir productos.");
      this.bMostrarListaProductos = false;
      return;
    }
    else
    {
      if (this.pedido.id === "")
      {
        this.pedidoServicio.insertarPedido(this.pedido).then((id) => {
          this.pedido.id = id;
        });
      }
      else
      {
        this.pedido.productos = this.pedido.productos;
      }

console.log("Mostrando productos de pedido para el pedido con id: " + this.pedido.id);
      this.bMostrarListaProductos = true;
    }
  }

  async mostrarPedidoActual() 
  {
      if (this.lPedidos.length > 0)
      { 
        this.pedido = this.lPedidos[this.indicePedidoActual];
        this.productosDePedidoServicio.obtenerProductosDePedidoPorPedidoId(this.pedido.id).then((productos: ProductosDePedidoModel[]) =>
        {
          console.log("Productos de pedido obtenidos desde el servicio: ", productos);
          this.lProductos = productos as ProductosDePedidoModel[];
          this.lProductos.forEach((producto) => 
          {
            console.log("Producto de pedido ID: ", producto.poductoId);
            this.productoServicio.obtenerNombreProductoPorId(producto.poductoId).then((productoConTodosLosDatos: ProductoModel) => {
              producto.nombreProducto = productoConTodosLosDatos.nombre;
              producto.tengo = productoConTodosLosDatos.tengo;
            });
          });
            
          console.log("Productos de pedido cargados: ", this.lProductos);
        });
        
        console.log("Pedido cargado: ", this.pedido.productos);
        console.log("lProductos: ", this.lProductos);
        //this.pedido.productos = this.lProductos;

        //this.lProductos = new Array<ProductosDePedidoModel>() ;
        //this.lProductos.push(new ProductosDePedidoModel({poductoId: "Cabra de chocolate", cantidad: 2}));
      }
      else
      { console.log("No hay pedidos"); }
  }    




}
