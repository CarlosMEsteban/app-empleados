import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenPedidosProductosHijo } from './orden-pedidos-productos-hijo';

describe('OrdenPedidosProductosHijo', () => {
  let component: OrdenPedidosProductosHijo;
  let fixture: ComponentFixture<OrdenPedidosProductosHijo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenPedidosProductosHijo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenPedidosProductosHijo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
