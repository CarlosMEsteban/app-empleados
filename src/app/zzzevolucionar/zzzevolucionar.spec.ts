import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zzzevolucionar } from './zzzevolucionar';

describe('Zzzevolucionar', () => {
  let component: Zzzevolucionar;
  let fixture: ComponentFixture<Zzzevolucionar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Zzzevolucionar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Zzzevolucionar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
