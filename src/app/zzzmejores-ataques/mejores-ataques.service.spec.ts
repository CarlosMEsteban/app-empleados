import { TestBed } from '@angular/core/testing';
import { MejoresAtaquesService } from './mejores-ataques.service';

describe('MejoresAtaquesService', () => {
  let service: MejoresAtaquesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MejoresAtaquesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});