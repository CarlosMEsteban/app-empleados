import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosDePedido } from './productos-de-pedido';

describe('ProductosDePedido', () => {
  let component: ProductosDePedido;
  let fixture: ComponentFixture<ProductosDePedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosDePedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosDePedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
