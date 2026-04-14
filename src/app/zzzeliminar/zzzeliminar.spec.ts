import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zzzeliminar } from './zzzeliminar';

describe('Zzzeliminar', () => {
  let component: Zzzeliminar;
  let fixture: ComponentFixture<Zzzeliminar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Zzzeliminar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Zzzeliminar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
