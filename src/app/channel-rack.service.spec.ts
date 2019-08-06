import { TestBed } from '@angular/core/testing';

import { ChannelRackService } from './channel-rack.service';

describe('ChannelRackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChannelRackService = TestBed.get(ChannelRackService);
    expect(service).toBeTruthy();
  });
});
