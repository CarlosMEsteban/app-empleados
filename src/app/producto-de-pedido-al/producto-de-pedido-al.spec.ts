import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoDePedidoAl } from './producto-de-pedido-al';

describe('ProductoDePedidoAl', () => {
  let component: ProductoDePedidoAl;
  let fixture: ComponentFixture<ProductoDePedidoAl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoDePedidoAl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoDePedidoAl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
