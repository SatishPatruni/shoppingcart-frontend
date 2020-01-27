import { TestBed } from '@angular/core/testing';

import { SecurestorageService } from './securestorage.service';

describe('SecurestorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecurestorageService = TestBed.get(SecurestorageService);
    expect(service).toBeTruthy();
  });
});
