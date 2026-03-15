import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZzzpokemonTipoPokemon } from './zzzpokemon-tipo-pokemon';

describe('ZzzpokemonTipoPokemon', () => {
  let component: ZzzpokemonTipoPokemon;
  let fixture: ComponentFixture<ZzzpokemonTipoPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZzzpokemonTipoPokemon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZzzpokemonTipoPokemon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
