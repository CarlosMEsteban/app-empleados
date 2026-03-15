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
import { Avance } from './avance/avance';
import { BarcoYFundicion } from './barco-yfundicion/barco-yfundicion';
import { ZZZAtaquesComponent } from './zzzataques/zzzataques.component';
import { ZzzmejoresAtaques } from './zzzmejores-ataques/zzzmejores-ataques';
import { ZzzmultiplicadorPolvos } from './zzzmultiplicador-polvos/zzzmultiplicador-polvos';
import { ZzzpokemonTipoPokemon } from './zzzpokemon-tipo-pokemon/zzzpokemon-tipo-pokemon';
import { Zzzpokemon } from './zzzpokemon/zzzpokemon';
import { ZzztipoPokemon } from './zzztipo-pokemon/zzztipo-pokemon';


export const routes: Routes = [
  {path:'', component: Tarea},
  {path:'productos', component: Producto}, 
  {path:'pedido', component: Pedido}, 
  {path:'pruebaMaterial', component: PruebaMaterial},
  {path:'productosDePedido', component: ProductosDePedido},
  {path:'herramienta', component: Herramienta},
  {path:'ordenPedidos', component: OrdenPedidos},
  {path:'avance', component: Avance},
  {path:'tarea', component: Tarea},
  {path:'barcoYFundicion', component: BarcoYFundicion},
  {path:'zzzataques', component: ZZZAtaquesComponent},
  {path:'zzzmejoresAtaques', component: ZzzmejoresAtaques},
  {path:'zzzmultiplicadorPolvos', component: ZzzmultiplicadorPolvos},
  {path:'zzzpokemonTipoPokemon', component: ZzzpokemonTipoPokemon},
  {path:'zzzpokemon', component: Zzzpokemon},
  {path:'zzztipoPokemon', component: ZzztipoPokemon},
  {path:'**', component: ErrorPersonalizado}
  
];
