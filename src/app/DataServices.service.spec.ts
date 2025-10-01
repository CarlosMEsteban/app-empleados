/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataServicesService } from './DataServices.service';

describe('Service: DataServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataServicesService]
    });
  });

  it('should ...', inject([DataServicesService], (service: DataServicesService) => {
    expect(service).toBeTruthy();
  }));
});
