import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZzzmultiplicadorPolvos } from './zzzmultiplicador-polvos';

describe('ZzzmultiplicadorPolvos', () => {
  let component: ZzzmultiplicadorPolvos;
  let fixture: ComponentFixture<ZzzmultiplicadorPolvos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZzzmultiplicadorPolvos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZzzmultiplicadorPolvos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
