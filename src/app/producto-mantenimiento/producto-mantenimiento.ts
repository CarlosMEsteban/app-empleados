import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoModel } from '../producto/producto.model';
import { ProductoService } from '../producto/producto.service';
import { IngredienteService } from '../ingrediente/ingrediente-service';

@Component({
  selector: 'app-producto-mantenimiento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-mantenimiento.html',
  styleUrl: './producto-mantenimiento.css',
})
export class ProductoMantenimiento {
  productos: ProductoModel[] = [];
  productoSeleccionado: ProductoModel = new ProductoModel({});
  modoEdicion = false;
  mensaje: string = '';
  ingredienteSeleccionadoId: string = '';
  cantidadIngrediente: number = 1;

  constructor(
    private productoService: ProductoService,
    private ingredienteService: IngredienteService
  ) {
    this.listarProductos();
  }

  async listarProductos() {
    this.productos = await this.productoService.listarProductos(new ProductoModel({}));
    if (!this.ingredienteSeleccionadoId && this.productos.length > 0) {
      this.ingredienteSeleccionadoId = this.productos[0].cProductoId ?? '';
    }
    this.mensaje = `Productos cargados: ${this.productos.length}`;
  }

  nuevoProducto() {
    this.productoSeleccionado = new ProductoModel({});
    this.modoEdicion = false;
    this.ingredienteSeleccionadoId = this.productos.length > 0 ? this.productos[0].cProductoId ?? '' : '';
    this.cantidadIngrediente = 1;
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
    this.ingredienteSeleccionadoId = this.productos.find(p => p.cProductoId && p.cProductoId !== producto.cProductoId)?.cProductoId ?? '';
    this.cantidadIngrediente = 1;
    this.mensaje = `Editando producto: ${producto.nombre}`;
  }

  get ingredientesDisponibles(): ProductoModel[] {
    if (!this.productoSeleccionado.cProductoId) {
      return this.productos;
    }
    return this.productos.filter(
      producto => producto.cProductoId && producto.cProductoId !== this.productoSeleccionado.cProductoId
    );
  }

  async anadirIngrediente() {
    if (!this.modoEdicion || !this.productoSeleccionado.cProductoId || !this.ingredienteSeleccionadoId) {
      this.mensaje = 'Selecciona un producto válido y un ingrediente para añadir.';
      return;
    }

    await this.ingredienteService.anadirIngredienteDeProducto(
      this.productoSeleccionado.cProductoId,
      this.ingredienteSeleccionadoId,
      this.cantidadIngrediente
    );

    this.mensaje = `Ingrediente añadido a ${this.productoSeleccionado.nombre}.`;
    this.cantidadIngrediente = 1;
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
