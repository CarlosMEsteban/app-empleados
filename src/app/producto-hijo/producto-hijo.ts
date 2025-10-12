import { Component, Input } from '@angular/core';
import { ProductoModel } from '../producto/producto.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../producto/producto.service';

@Component({
  selector: 'app-producto-hijo',
  imports: [RouterLink, FormsModule],
  templateUrl: './producto-hijo.html',
  styleUrl: './producto-hijo.css'
})
export class ProductoHijo {
  @Input() productoDeLista!: ProductoModel;
  @Input() indice!: number;

  productoServicio: ProductoService;

  constructor(productoService: ProductoService)
  {
    this.productoServicio = productoService;
  }

  cambiarTengo()
  {
    this.productoServicio.modificarTengo(this.productoDeLista.getNombre(), this.productoDeLista.getTengo());
  }
}
