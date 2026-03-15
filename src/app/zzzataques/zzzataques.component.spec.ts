import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZZZAtaquesComponent } from './zzzataques.component';

describe('ZZZAtaquesComponent', () => {
  let component: ZZZAtaquesComponent;
  let fixture: ComponentFixture<ZZZAtaquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZZZAtaquesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZZZAtaquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});