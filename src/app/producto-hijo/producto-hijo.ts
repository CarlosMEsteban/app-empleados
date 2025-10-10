import { Component, Input } from '@angular/core';
import { ProductoModel } from '../producto/producto.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto-hijo',
  imports: [RouterLink, FormsModule],
  templateUrl: './producto-hijo.html',
  styleUrl: './producto-hijo.css'
})
export class ProductoHijo {
  @Input() productoDeLista!: ProductoModel;
  @Input() indice!: number;

  cambiarTengo()
  {
    console.log(this.productoDeLista.getNombre());
    console.log(this.productoDeLista.getTengo());
  }
}
