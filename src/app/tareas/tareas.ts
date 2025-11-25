import { Component, Input } from '@angular/core';
import { TareaModel } from '../tarea/tarea.model';

@Component({
  selector: 'app-tareas',
  imports: [],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css'
})
export class Tareas {
  @Input() tarea!: TareaModel;

  
}
