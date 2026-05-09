import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenPedidosAlAire } from './orden-pedidos-al-aire';

describe('OrdenPedidosAlAire', () => {
  let component: OrdenPedidosAlAire;
  let fixture: ComponentFixture<OrdenPedidosAlAire>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenPedidosAlAire]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenPedidosAlAire);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
