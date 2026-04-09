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
import { ZzzmisPokemon } from './zzzmis-pokemon/zzzmis-pokemon';
import { ZzzmasPoder } from './zzzmas-poder/zzzmas-poder';
import { Zzzevolucionar} from './zzzevolucionar/zzzevolucionar';
import { Zzzavance } from './zzzavance/zzzavance';
import { ZzzsinEvolucionar } from './zzzsin-evolucionar/zzzsin-evolucionar';
import { ZzzcambiarAtCargado } from './zzzcambiar-at-cargado/zzzcambiar-at-cargado';
import { ZzzvalorHistorico } from './zzzvalor-historico/zzzvalor-historico';
import { Zzzpokemon } from './zzzpokemon/zzzpokemon';
import { ZzzmisPokemonDinamax } from './zzzmis-pokemon-dinamax/zzzmis-pokemon-dinamax';
import { ZzzPokemonCargaInicial } from './zzzpokemon-carga-inicial/zzzpokemon-carga-inicial';
import { ZzzcambiarAtRapido } from './zzzcambiar-at-rapido/zzzcambiar-at-rapido';


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
  {path:'MisPokemon', component: ZzzmisPokemon},
  {path:'MasPoder', component: ZzzmasPoder},
  {path:'evolucionar', component: Zzzevolucionar},
  {path:'avancePokemonGo', component: Zzzavance},
  {path:'sinEvolucionar', component: ZzzsinEvolucionar},
  {path:'cambiarAtRapido', component: ZzzcambiarAtRapido},
  {path:'cambiarAtCargado', component: ZzzcambiarAtCargado},
  {path:'avanceHistorico', component: ZzzvalorHistorico},
  {path:'zzzPokemon', component: Zzzpokemon},
  {path:'zzzMisPokemonDinamax', component: ZzzmisPokemonDinamax},
  {path:'zzzPokemonCargaInicial', component: ZzzPokemonCargaInicial},
  {path:'**', component: ErrorPersonalizado}
  
];
