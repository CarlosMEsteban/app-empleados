import { Component } from '@angular/core';
import { ProductoService } from '../producto/producto.service';
import { ProductoModel } from '../producto/producto.model';
import { PedidoService } from '../pedido/pedido-service';
import { ProductosDePedido } from '../productos-de-pedido/productos-de-pedido';
import { ProductoDePedidoService } from '../producto-de-pedido/producto-de-pedido.service';

@Component({
  selector: 'app-exportar',
  imports: [],
  templateUrl: './exportar.html',
  styleUrl: './exportar.css'
})
export class Exportar 
{
  productoServicio: ProductoService;
  pedidoServicio: PedidoService;
  productoDePedidoServicio: ProductoDePedidoService;
  
  constructor(productoServicio: ProductoService,
              pedidoServicio: PedidoService,
              productoDePedidoServicio: ProductoDePedidoService
  ) { 
    this.productoServicio = productoServicio;
    this.pedidoServicio = pedidoServicio;
    this.productoDePedidoServicio = productoDePedidoServicio;
  }

  async exportarDatos() 
  {
    console.clear();
    console.log("Exportando datos...");
    // Aquí iría la lógica para exportar los datos
    let todosLosProductos = await this.productoServicio.listarProductos(new ProductoModel({}));
    todosLosProductos.forEach(producto => {
        console.log("this.productoServicio.modificarTengo(" + producto.cProductoId +", " + producto.tengo + ");");                    
      });
    console.log("Exportados los productos.");


    /*this.productoServicio.listarProductos(new ProductoModel({})).then(lProductosDevueltos =>
                {
                  console.log("lProductosDevueltos: " + lProductosDevueltos.length);
                  lProductosDevueltos.forEach(producto => {
                    console.log("this.productoServicio.modificarTengo(" + producto.cProductoId +", " + producto.tengo + ");");                    
                  });
                  
                }
                );
    */

    let todosLosPedidos = await this.pedidoServicio.listarPedidos();

    todosLosPedidos.forEach(pedido => {
        console.log("nuevoPedido = this.pedidoServicio.insertarPedido(new PedidoModel({ orden: " + pedido.orden + ", oro: " + pedido.oro + ", estrellas: " + pedido.estrellas + "}));");
        this.productoDePedidoServicio.obtenerProductosDePedidoPorPedidoId(pedido.id).then( productosDePedido => {
            productosDePedido.forEach( productoDePedido => {
                console.log("this.productoDePedidoServicio.anadirProductoDePedido(nuevoPedido, new ProductosDePedidoModel({ poductoId: nuevoPedido, cantidad: " + productoDePedido.cantidad + "}));");
            });
        });

      });

      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Exportados los pedidos.");
  }

}
