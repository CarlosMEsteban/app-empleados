import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZzzvalorHistorico } from './zzzvalor-historico';

describe('ZzzvalorHistorico', () => {
  let component: ZzzvalorHistorico;
  let fixture: ComponentFixture<ZzzvalorHistorico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZzzvalorHistorico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZzzvalorHistorico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
