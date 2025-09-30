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


export const routes: Routes = [
  {path:'', component: Home},
  {path:'contacto', component: Contacto}, 
  {path:'proyectos', component: Proyectos}, 
  {path:'quienesSomos', component: QuienesSomos},
  {path:'actualiza/:id', component: Actualiza},
  {path:'**', component: ErrorPersonalizado}
];
