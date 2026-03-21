import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZzzsinEvolucionar } from './zzzsin-evolucionar';

describe('ZzzsinEvolucionar', () => {
  let component: ZzzsinEvolucionar;
  let fixture: ComponentFixture<ZzzsinEvolucionar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZzzsinEvolucionar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZzzsinEvolucionar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
