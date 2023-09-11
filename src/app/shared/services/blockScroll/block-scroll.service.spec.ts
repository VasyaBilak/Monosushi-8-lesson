import { TestBed } from '@angular/core/testing';

import { BlockScrollService } from './block-scroll.service';

describe('BlockScrollService', () => {
  let service: BlockScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
