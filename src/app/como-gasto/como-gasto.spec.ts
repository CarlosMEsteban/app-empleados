import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComoGasto } from './como-gasto';

describe('ComoGasto', () => {
  let component: ComoGasto;
  let fixture: ComponentFixture<ComoGasto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComoGasto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComoGasto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
