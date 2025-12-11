import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcoYFundicion } from './barco-yfundicion';

describe('BarcoYFundicion', () => {
  let component: BarcoYFundicion;
  let fixture: ComponentFixture<BarcoYFundicion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarcoYFundicion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarcoYFundicion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
