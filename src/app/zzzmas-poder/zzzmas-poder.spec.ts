import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZzzmasPoder } from './zzzmas-poder';

describe('ZzzmasPoder', () => {
  let component: ZzzmasPoder;
  let fixture: ComponentFixture<ZzzmasPoder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZzzmasPoder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZzzmasPoder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
