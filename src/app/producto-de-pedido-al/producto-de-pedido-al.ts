import { Component , EventEmitter, Input, Output } from '@angular/core';
import { ProductosDePedidoModel } from '../productos-de-pedido/productosDePedido.model';
import { FormsModule } from '@angular/forms';
import { ProductoModel } from '../producto/producto.model';
import { ProductoService } from '../producto/producto.service';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map, async } from 'rxjs';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoDePedidoService } from '../producto-de-pedido/producto-de-pedido.service';

@Component({
  selector: 'app-producto-de-pedido-al',
  imports: [FormsModule, MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule, CommonModule],
  templateUrl: './producto-de-pedido-al.html',
  styleUrl: './producto-de-pedido-al.css'
})
export class ProductoDePedidoAl {
  producto: ProductosDePedidoModel = new ProductosDePedidoModel({poductoId: "", cantidad: -1});
  @Input() pedidoId?: string = ''; // <-- recibe el id del pedido
  @Input() todosLosProductos: string[] = [];
  @Output() pedidoActualizado = new EventEmitter<void>(); // Evento para notificar al componente padre que se ha añadido un producto 
  mProductos: Map<string, string> = new Map<string, string>();

  productoNombreControl = new FormControl('');
  productosFiltrados!: Observable<string[]>;
  productoDePedidoServicio: ProductoDePedidoService;
  productoServicio: ProductoService;
  
  constructor(productoServicio: ProductoService, productoDePedidoServicio: ProductoDePedidoService)
  {
    this.productoDePedidoServicio = productoDePedidoServicio;
    this.productoServicio = productoServicio;
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

  altaProductoDePedido() 
  {
    console.clear();
    console.log("Alta producto de pedido para pedidoId: " + this.pedidoId);
    if (this.productoNombreControl.value == "" || this.producto.cantidad < 0 || this.producto.tengo < 0)
    {
      alert("Debe indicar un producto y una cantidad válida");
      return;
    }
    else
    {
      console.log("Alta producto : " + this.productoNombreControl.value + ", cantidad: " + this.producto.cantidad);
      this.producto.poductoId = this.mProductos.get(this.productoNombreControl.value ?? "") || "";
      if (this.producto.poductoId == "")
      {
        alert("Debe indicar un producto válido");
        return;
      }
      else
      {
        console.log("ID del producto: " + this.producto.poductoId);
        
        this.productoDePedidoServicio.anadirProductoDePedido(this.pedidoId ?? "", this.producto);
        this.productoServicio.modificarTengoPorId(this.producto.poductoId, this.producto.tengo);
        this.pedidoActualizado.emit(); // Para actualizar el pedido en el componente padre
        this.producto = new ProductosDePedidoModel({poductoId: "", cantidad: -1, tengo: -1});
        this.productoNombreControl.setValue('');
      }
    }
  }

 onProductoSeleccionado(event: MatAutocompleteSelectedEvent) {
    const nombre = (event.option?.value ?? '') as string;
    // guardar nombre en el control (ya lo hace el autocomplete pero asegura estado)
    this.productoNombreControl.setValue(nombre);

    // buscar id en el mapa mProductos (asegúrate de llenarlo al cargar productos)
    const id = this.mProductos.get(nombre) ?? '';

    this.productoServicio.obtenerTengoPorId(id).then(tengo => {
      this.producto.tengo = tengo;
    });
  }  

}
