import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ZZZAtaquesService } from './zzzataques.service';

@Component({
  selector: 'app-zzzataques',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './zzzataques.component.html',
  styleUrls: ['./zzzataques.component.css']
})
export class ZZZAtaquesComponent {

  constructor(private http: HttpClient, private ataquesService: ZZZAtaquesService) {}

  async cargarAtaques() {
    try {
      await this.ataquesService.cargarAtaques();
    } catch (error) {
      console.error('Error al cargar ataques:', error);
      alert('Error al cargar ataques.');
    }
  }
}