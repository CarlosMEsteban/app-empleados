import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZzzmejoresAtaques } from './zzzmejores-ataques';

describe('ZzzmejoresAtaques', () => {
  let component: ZzzmejoresAtaques;
  let fixture: ComponentFixture<ZzzmejoresAtaques>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZzzmejoresAtaques]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZzzmejoresAtaques);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
