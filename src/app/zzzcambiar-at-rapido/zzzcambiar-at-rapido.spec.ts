import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZzzcambiarAtRapido } from './zzzcambiar-at-rapido';

describe('ZzzcambiarAtRapido', () => {
  let component: ZzzcambiarAtRapido;
  let fixture: ComponentFixture<ZzzcambiarAtRapido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZzzcambiarAtRapido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZzzcambiarAtRapido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
