import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoHijo } from './producto-hijo';

describe('ProductoHijo', () => {
  let component: ProductoHijo;
  let fixture: ComponentFixture<ProductoHijo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoHijo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoHijo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
