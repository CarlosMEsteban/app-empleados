import { Component, Input } from '@angular/core';
import { ProductosDePedidoModel } from '../productos-de-pedido/productosDePedido.model';
import { NgFor, NgIf } from '@angular/common';
import { IngredienteService } from '../ingrediente/ingrediente-service';
import { ProductoService } from '../producto/producto.service';
import { IngredienteFaltaModel } from '../orden-pedidos-productos-hijo/ingredienteFalta.model';
import { ProductoModel } from '../producto/producto.model';
import { CdkAutofill } from "@angular/cdk/text-field";

@Component({
  selector: 'app-orden-pedidos-productos-hijo',
  imports: [CdkAutofill],
  templateUrl: './orden-pedidos-productos-hijo.html',
  styleUrl: './orden-pedidos-productos-hijo.css'
})
export class OrdenPedidosProductosHijo 
{
  @Input() productoDePedido!: ProductosDePedidoModel;

  ingredienteServicio: IngredienteService;
  productoServicio: ProductoService;

  lIngredientesFaltantes: IngredienteFaltaModel[] = [];

  constructor(ingredienteServicio: IngredienteService, productoServicio: ProductoService)
  {
    this.ingredienteServicio = ingredienteServicio;
    this.productoServicio = productoServicio;
  }

  claseSegunFalta(): string
  {
    if (this.productoDePedido == undefined)
      return "green";
    else
      if (this.productoDePedido.cantidad > this.productoDePedido.tengo)
        return "coral";
      else
        return "aliceblue";
  }

  mostrarIngredientes(): void
  { 
    
    console.log("Mostrar ingredientes para el producto de pedido:", this.productoDePedido);
    this.ingredienteServicio.ingredientesDeProducto(this.productoDePedido.poductoId).then( ingredientes => 
      {
        console.log("Ingredientes obtenidos:", ingredientes);
        this.lIngredientesFaltantes = [];
        ingredientes.forEach( ingrediente => 
        {
          console.log("- Ingrediente:", ingrediente);
          this.productoServicio.obtenerNombreProductoPorId(ingrediente.cProductoNecesitadoId).then((productoConTodosLosDatos: ProductoModel) => 
          {
            if (!productoConTodosLosDatos.materiaPrima)
            {
              let iFM: IngredienteFaltaModel = new IngredienteFaltaModel();
              iFM.cProductoId = ingrediente.cProductoNecesitadoId;
              iFM.nombre = productoConTodosLosDatos.nombre;
              iFM.cantidad = ingrediente.cantidad * this.productoDePedido.cantidad;
              iFM.tengo = productoConTodosLosDatos.tengo;
              this.lIngredientesFaltantes.push(iFM);
              console.log("  - IngredienteFaltaModel añadido:", iFM);
            }
          });


          
        });
      });
  }

  mostrarCoste(): void
  {
    console.log("ANTES Coste del producto", this.productoDePedido.nombreProducto, ":", this.productoDePedido.coste);    
    if (this.productoDePedido.coste == -1)
    {
      console.log("  - Coste no disponible");
      this.productoServicio.obtenerCosteProductoPorId(this.productoDePedido.poductoId).then( costeObtenido =>
      {
        console.log("  - Coste obtenido:", costeObtenido);
        this.productoDePedido.coste = costeObtenido;
      });
    }
    console.log("DESPUÉS Coste del producto", this.productoDePedido.nombreProducto, ":", this.productoDePedido.coste);    

  }
  ocultarCoste(): void
  {
    console.log("Ocultar coste del producto", this.productoDePedido.nombreProducto);    
  }
}
