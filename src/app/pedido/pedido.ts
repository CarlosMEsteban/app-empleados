import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PedidoModel } from './pedido.model';
import { CommonModule, NgIf } from '@angular/common';
import { ProductosDePedido } from "../productos-de-pedido/productos-de-pedido";
import { PedidoService } from './pedido-service';
import { ProductosDePedidoModel } from '../productos-de-pedido/productosDePedido.model';
import { Producto } from "../producto/producto";

@Component({
  selector: 'app-pedido',
  imports: [FormsModule, NgIf, ProductosDePedido, Producto, CommonModule],
  templateUrl: './pedido.html',
  styleUrl: './pedido.css'
})
export class Pedido {
  @Input() pedido: PedidoModel = new PedidoModel({orden: -1, estrellas: -1, oro: -1  });
  bMostrarListaProductos: boolean = false;
  lPedidos: PedidoModel[] = [];
  lProductos: ProductosDePedidoModel[] = [];

  pedidoServicio: PedidoService

  constructor(pedidoServicio: PedidoService){
    this.pedidoServicio = pedidoServicio;
    this.pedidoServicio.obtenerPedidos().then((pedidos: PedidoModel[]) => {
      this.lPedidos = pedidos as PedidoModel[];
      if (this.lPedidos.length > 0)
      { console.log("Hay pedidos"); 
        this.pedido = this.lPedidos[0];
        this.pedido.productos = this.lProductos;
        this.lProductos = new Array<ProductosDePedidoModel>() ;
        this.lProductos.push(new ProductosDePedidoModel({poductoId: "producto1", cantidad: 2}));
      }
      else
      { console.log("No hay pedidos"); }
    });
  }

  onInit() {
    console.log("OnInit Pedido");
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


      this.bMostrarListaProductos = true;
    }
  }

}
