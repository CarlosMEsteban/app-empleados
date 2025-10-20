import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenPedidos } from './orden-pedidos';

describe('OrdenPedidos', () => {
  let component: OrdenPedidos;
  let fixture: ComponentFixture<OrdenPedidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenPedidos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenPedidos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
