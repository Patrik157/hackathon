import { TestBed } from '@angular/core/testing';

import { HeatMapService } from './heat-map.service';

describe('HeatMapService', () => {
  let service: HeatMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeatMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
