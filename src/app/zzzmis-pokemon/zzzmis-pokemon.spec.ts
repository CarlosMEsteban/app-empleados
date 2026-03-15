import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZzzmisPokemon } from './zzzmis-pokemon';

describe('ZzzmisPokemon', () => {
  let component: ZzzmisPokemon;
  let fixture: ComponentFixture<ZzzmisPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZzzmisPokemon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZzzmisPokemon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
