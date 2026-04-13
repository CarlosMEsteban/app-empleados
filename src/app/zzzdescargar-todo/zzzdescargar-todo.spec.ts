import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZzzdescargarTodo } from './zzzdescargar-todo';

describe('ZzzdescargarTodo', () => {
  let component: ZzzdescargarTodo;
  let fixture: ComponentFixture<ZzzdescargarTodo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZzzdescargarTodo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZzzdescargarTodo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
