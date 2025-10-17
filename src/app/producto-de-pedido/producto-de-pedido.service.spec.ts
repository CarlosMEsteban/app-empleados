import { TestBed } from '@angular/core/testing';

import { ProductoDePedidoService } from './producto-de-pedido.service';

describe('ProductoDePedidoService', () => {
  let service: ProductoDePedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoDePedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
