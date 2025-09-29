import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actualiza } from './actualiza';

describe('Actualiza', () => {
  let component: Actualiza;
  let fixture: ComponentFixture<Actualiza>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Actualiza]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Actualiza);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
