import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZzztipoPokemon } from './zzztipo-pokemon';

describe('ZzztipoPokemon', () => {
  let component: ZzztipoPokemon;
  let fixture: ComponentFixture<ZzztipoPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZzztipoPokemon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZzztipoPokemon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
