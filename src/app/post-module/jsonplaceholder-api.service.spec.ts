import { TestBed } from '@angular/core/testing';

import { JsonplaceholderApiService } from './jsonplaceholder-api.service';

describe('JsonplaceholderApiService', () => {
  let service: JsonplaceholderApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonplaceholderApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
