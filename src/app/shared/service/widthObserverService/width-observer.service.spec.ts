import { TestBed } from '@angular/core/testing';

import { ScreenSizeObserverService } from './screen-size-observer.service';

describe('WidthObserverService', () => {
  let service: ScreenSizeObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenSizeObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
