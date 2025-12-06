import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ErrorPersonalizado } from './error-personalizado/error-personalizado';
import { Producto } from './producto/producto';
import { Pedido } from './pedido/pedido';
import { PruebaMaterial } from './prueba-material/prueba-material';
import { ProductosDePedido } from './productos-de-pedido/productos-de-pedido';
import { OrdenPedidos } from './orden-pedidos/orden-pedidos';
import { Tarea } from './tarea/tarea';
import { Herramienta } from './herramienta/herramienta';


export const routes: Routes = [
  {path:'', component: Tarea},
  {path:'productos', component: Producto}, 
  {path:'pedido', component: Pedido}, 
  {path:'pruebaMaterial', component: PruebaMaterial},
  {path:'productosDePedido', component: ProductosDePedido},
  {path:'herramienta', component: Herramienta},
  {path:'ordenPedidos', component: OrdenPedidos},
  {path:'tarea', component: Tarea},
  {path:'**', component: ErrorPersonalizado}
];
