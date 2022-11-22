import { TestBed } from '@angular/core/testing';

import { ClickTravelService } from './click-travel.service';

describe('ClickTravelService', () => {
  let service: ClickTravelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClickTravelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
