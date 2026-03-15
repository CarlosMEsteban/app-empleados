import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zzzpokemon } from './zzzpokemon';

describe('Zzzpokemon', () => {
  let component: Zzzpokemon;
  let fixture: ComponentFixture<Zzzpokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Zzzpokemon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Zzzpokemon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
