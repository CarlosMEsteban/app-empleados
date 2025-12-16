import { Component, Input } from '@angular/core';
import { ProductoModel } from '../producto/producto.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../producto/producto.service';
import { comoGastoModel } from '../como-gasto/como-gasto.model';
import { comoGastoService } from '../como-gasto/como-gasto.service';


@Component({
  selector: 'app-producto-hijo',
  imports: [RouterLink, FormsModule],
  templateUrl: './producto-hijo.html',
  styleUrl: './producto-hijo.css'
})
export class ProductoHijo {
  @Input() productoDeLista!: ProductoModel;
  @Input() indice!: number;

  lComoGasto: comoGastoModel[] = [];

  aEliminar: boolean = false;

  productoServicio: ProductoService;
  comoGastoServicio: comoGastoService;

  constructor(productoServicio: ProductoService, comoGastoServicio: comoGastoService)
  {
    this.productoServicio = productoServicio;
    this.comoGastoServicio = comoGastoServicio;
  }

  cambiarTengo()
  {
    // TODO que se busque el producto por id en vez de por nombre
    this.productoServicio.modificarTengo(this.productoDeLista.getNombre(), this.productoDeLista.getTengo());
  }

   async eliminarFase2()
  {
    if (window.confirm("¿Está seguro de que desea eliminar este PRODUCTO?"))
    {
      await this.productoServicio.eliminar(this.productoDeLista.cProductoId);

    }
    
  }

  comoGasto(cProductoId: string)
  {
    this.comoGastoServicio.comoGasto(cProductoId).then( lComoGasto => 
    {
      console.log("como gasto:", lComoGasto);
      this.lComoGasto = lComoGasto;
      lComoGasto.sort( a => a.cuantoGasto);
    });


    let a  = 0;

    
  }
}
