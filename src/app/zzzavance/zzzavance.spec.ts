import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zzzavance } from './zzzavance';

describe('Zzzavance', () => {
  let component: Zzzavance;
  let fixture: ComponentFixture<Zzzavance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Zzzavance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Zzzavance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
