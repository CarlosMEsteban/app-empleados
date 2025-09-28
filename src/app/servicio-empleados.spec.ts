import { TestBed } from '@angular/core/testing';

import { ServicioEmpleados } from './servicio-empleados';

describe('ServicioEmpleados', () => {
  let service: ServicioEmpleados;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioEmpleados);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
