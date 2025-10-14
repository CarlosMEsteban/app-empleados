import { Component, Input } from '@angular/core';
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
  mProductos: Map<string, string> = new Map<string, string>();

  productoNombreControl = new FormControl('');
  productosFiltrados!: Observable<string[]>;

  
  constructor(productoServicio: ProductoService)
  {
    console.log("ññññ" + this.todosLosProductos + "pppp");
    productoServicio.listarProductos(new ProductoModel({})).then(lTodos =>
      {
        console.log("Tamaño de la lista  de productos: " + lTodos.length);
        lTodos.forEach((prod: ProductoModel) => {
          console.log("producto: " + prod.nombre);
          this.mProductos.set(prod.nombre, prod.cProductoId);
          this.todosLosProductos.push(prod.nombre);
          console.log("Tamaño de la lista  de productos: " + this.todosLosProductos.length);
      });
    });    
    console.log("Sañlio del constructor");
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

}
