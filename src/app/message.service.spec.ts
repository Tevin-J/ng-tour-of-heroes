import { TestBed } from '@angular/core/testing';

import { MassageService } from './message.service';

describe('MassageService', () => {
  let service: MassageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MassageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
