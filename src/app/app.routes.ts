import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { ContactoComponent } from './contacto-component/contacto-component';
import { ProyectosComponent } from './proyectos-component/proyectos-component';
import { QuienesComponent } from './quienes-component/quienes-component';
import { Home } from './home/home';
import { Contacto } from './contacto/contacto';
import { Proyectos } from './proyectos/proyectos';
import { QuienesSomos } from './quienes-somos/quienes-somos';
import { Actualiza } from './actualiza/actualiza';
import { ErrorPersonalizado } from './error-personalizado/error-personalizado';
import { Login } from './login/login';
import { Producto } from './producto/producto';
import { Pedido } from './pedido/pedido';
import { PruebaMaterial } from './prueba-material/prueba-material';
import { ProductosDePedido } from './productos-de-pedido/productos-de-pedido';
import { Exportar } from './exportar/exportar';
import { OrdenPedidos } from './orden-pedidos/orden-pedidos';


export const routes: Routes = [
  {path:'', component: Home},
  {path:'contacto', component: Contacto}, 
  {path:'proyectos', component: Proyectos}, 
  {path:'quienesSomos', component: QuienesSomos},
  {path:'productos', component: Producto}, 
  {path:'pedido', component: Pedido}, 
  {path:'actualiza/:id', component: Actualiza},
  {path:'login', component: Login},
  {path:'pruebaMaterial', component: PruebaMaterial},
  {path:'productosDePedido', component: ProductosDePedido},
  {path:'exportar', component: Exportar},
  {path:'ordenPedidos', component: OrdenPedidos},
  {path:'**', component: ErrorPersonalizado}
];
