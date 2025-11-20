import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductosDePedidoModel } from './productosDePedido.model';
import { FormsModule } from '@angular/forms';
import { ProductoModel } from '../producto/producto.model';
import { ProductoService } from '../producto/producto.service';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map, async } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PedidoModel } from '../pedido/pedido.model';
import { ProductoDePedidoService } from '../producto-de-pedido/producto-de-pedido.service';

@Component({
  selector: 'app-productos-de-pedido',
  imports: [FormsModule, MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule, CommonModule],
  templateUrl: './productos-de-pedido.html',
  styleUrl: './productos-de-pedido.css'
})
export class ProductosDePedido {
  productosDePedido: any[] = [];
  @Input() producto!: ProductosDePedidoModel;
  @Input() aaaa!: ProductosDePedidoModel;
  @Input() todosLosProductos: string[] = [];
  @Input() pedidoId?: string = ''; // <-- recibe el id del pedido

  @Output() productoEliminado = new EventEmitter<void>();
  
  
  mProductos: Map<string, string> = new Map<string, string>();

  productoNombreControl = new FormControl('');
  productosFiltrados!: Observable<string[]>;

  productoDePedidoServicio: ProductoDePedidoService

  
  constructor(productoServicio: ProductoService,
              productoDePedidoServicio: ProductoDePedidoService)
  {
    console.log("Constructor ProductosDePedido");
    this.productoDePedidoServicio = productoDePedidoServicio;
    productoServicio.listarProductos(new ProductoModel({})).then(lTodos =>
      {
        console.log("Tamaño de la lista  de productos: " + lTodos.length);
        lTodos.forEach((prod: ProductoModel) => {
          this.mProductos.set(prod.nombre, prod.cProductoId);
          this.todosLosProductos.push(prod.nombre);
      });
    });    
    
  }

  ngOnInit() {
    this.productosFiltrados = this.productoNombreControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filtrar(value || ''))  
    );
  }

  private _filtrar(valor: string): string[] {
    const filtro = valor.toLowerCase();
    return this.todosLosProductos.filter(p => p.toLowerCase().includes(filtro));
  }

  eliminar() 
  {
    console.clear();
    console.log("Eliminar producto de pedido: " + this.pedidoId);
    if (window.confirm("¿Está seguro de que desea eliminar este producto del pedido?"))
    {
      this.productoDePedidoServicio.eliminarProductoDePedido(this.pedidoId!, this.producto.poductoId)
        .then(() => {
          console.log("Producto de pedido eliminado correctamente.");
          this.productoEliminado.emit(); // Notificar al componente padre
        })

      
    }
    
  } 

}
