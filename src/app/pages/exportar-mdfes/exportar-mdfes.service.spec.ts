import { TestBed } from '@angular/core/testing';

import { ExportarMdfesService } from './exportar-mdfes.service';

describe('ExportarMdfesService', () => {
  let service: ExportarMdfesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportarMdfesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
