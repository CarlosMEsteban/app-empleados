import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenPedidosHijo } from './orden-pedidos-hijo';

describe('OrdenPedidosHijo', () => {
  let component: OrdenPedidosHijo;
  let fixture: ComponentFixture<OrdenPedidosHijo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenPedidosHijo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenPedidosHijo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
