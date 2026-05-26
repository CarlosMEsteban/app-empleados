import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ProductoModel } from '../producto/producto.model';
import { ProductoService } from '../producto/producto.service';

@Component({
  selector: 'app-producto-mantenimiento',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './producto-mantenimiento.html',
  styleUrl: './producto-mantenimiento.css',
})
export class ProductoMantenimiento {
  productos: ProductoModel[] = [];
  productoSeleccionado: ProductoModel = new ProductoModel({});
  modoEdicion = false;
  mensaje: string = '';

  constructor(private productoService: ProductoService) {
    this.listarProductos();
  }

  async listarProductos() {
    this.productos = await this.productoService.listarProductos(new ProductoModel({}));
    this.mensaje = `Productos cargados: ${this.productos.length}`;
  }

  nuevoProducto() {
    this.productoSeleccionado = new ProductoModel({});
    this.modoEdicion = false;
    this.mensaje = 'Preparado para crear un nuevo producto.';
  }

  editarProducto(producto: ProductoModel) {
    this.productoSeleccionado = new ProductoModel({
      cProductoId: producto.cProductoId,
      id: producto.id,
      nombre: producto.nombre,
      coste: producto.coste,
      tengo: producto.tengo,
      almacen: producto.almacen,
      materiaPrima: producto.materiaPrima,
      cantidadInicial: producto.cantidadInicial,
      fabrica: producto.fabrica,
      ingrediente: producto.ingrediente,
    });
    this.modoEdicion = true;
    this.mensaje = `Editando producto: ${producto.nombre}`;
  }

  async guardarProducto(form: NgForm) {
    if (!form.valid) {
      this.mensaje = 'Debe completar todos los campos obligatorios antes de guardar.';
      return;
    }

    if (this.modoEdicion && this.productoSeleccionado.cProductoId) {
      await this.productoService.actualizar(this.productoSeleccionado);
      this.mensaje = `Producto actualizado: ${this.productoSeleccionado.nombre}`;
    } else {
      await this.productoService.agregarService(this.productoSeleccionado);
      this.mensaje = `Producto creado: ${this.productoSeleccionado.nombre}`;
    }

    await this.listarProductos();
    this.nuevoProducto();
  }

  async eliminarProducto(producto: ProductoModel) {
    if (!producto.cProductoId) {
      this.mensaje = 'No se puede eliminar un producto sin ID.';
      return;
    }

    if (window.confirm(`¿Eliminar producto ${producto.nombre}?`)) {
      await this.productoService.eliminar(producto.cProductoId);
      this.mensaje = `Producto eliminado: ${producto.nombre}`;
      await this.listarProductos();
      this.nuevoProducto();
    }
  }

  cancelar() {
    this.nuevoProducto();
    this.mensaje = 'Operación cancelada.';
  }
}
