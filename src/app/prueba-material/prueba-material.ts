import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map, async } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../producto/producto.service';
import { ProductoModel } from '../producto/producto.model';



@Component({
  selector: 'app-prueba-material',
  imports: [MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule, CommonModule],
  templateUrl: './prueba-material.html',
  styleUrl: './prueba-material.css'
})
export class PruebaMaterial {
  @Input() producto: any;
  @Input() todosLosProductos: string[] = [];
  mProductos: Map<string, string> = new Map<string, string>();

  productoNombreControl = new FormControl('');
  productosFiltrados!: Observable<string[]>;

  constructor(productoServicio: ProductoService) {   
    console.log("->" + this.todosLosProductos + "<-");
    productoServicio.listarProductos(new ProductoModel({})).then(lTodos => {
      lTodos.forEach((prod: ProductoModel) => {
        this.mProductos.set(prod.nombre, prod.cProductoId);
        this.todosLosProductos.push(prod.nombre);
    });
    });
    
  
    console.log(this.todosLosProductos);
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

  mostrarProducto(event: any) {
    console.log("motrarProducto");
    const nombreProducto = event.option.value;
    if (!nombreProducto) {
      console.log('No se ha seleccionado ningún producto.');
      return;
    }
    else
    {
      console.log(nombreProducto);    
      if (!this.todosLosProductos.includes(nombreProducto)) 
        this.productoNombreControl.setValue('');
      else
      {
        let idProducto = this.mProductos.get(nombreProducto ?? "");
        console.log('Producto seleccionado:', nombreProducto, 'ID:', idProducto);
      }
    }
  }

  mostrarProducto2(event: any) {
    console.log("motrarProducto2");
    const nombreProducto = this.productoNombreControl.value;
    if (!nombreProducto) {
      console.log('No se ha seleccionado ningún producto.');
      return;
    }
    else
    {
      console.log(nombreProducto);    
      if (!this.todosLosProductos.includes(nombreProducto)) 
        this.productoNombreControl.setValue('');
      else
      {
        let idProducto = this.mProductos.get(nombreProducto ?? "");
        console.log('Producto seleccionado:', nombreProducto, 'ID:', idProducto);
      }
    }
  }  
}