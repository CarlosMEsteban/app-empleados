import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaMaterial } from './prueba-material';

describe('PruebaMaterial', () => {
  let component: PruebaMaterial;
  let fixture: ComponentFixture<PruebaMaterial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebaMaterial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebaMaterial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
