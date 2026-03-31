import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZzzmisPokemonDinamax } from './zzzmis-pokemon-dinamax';

describe('ZzzmisPokemonDinamax', () => {
  let component: ZzzmisPokemonDinamax;
  let fixture: ComponentFixture<ZzzmisPokemonDinamax>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZzzmisPokemonDinamax]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZzzmisPokemonDinamax);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
