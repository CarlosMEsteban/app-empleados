import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoMantenimiento } from './producto-mantenimiento';

describe('ProductoMantenimiento', () => {
  let component: ProductoMantenimiento;
  let fixture: ComponentFixture<ProductoMantenimiento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoMantenimiento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoMantenimiento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
