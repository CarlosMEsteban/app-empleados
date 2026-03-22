import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZzzcambiarAtCargado } from './zzzcambiar-at-cargado';

describe('ZzzcambiarAtCargado', () => {
  let component: ZzzcambiarAtCargado;
  let fixture: ComponentFixture<ZzzcambiarAtCargado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZzzcambiarAtCargado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZzzcambiarAtCargado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
