import { TestBed } from '@angular/core/testing';

import { GistService } from './gist.service';
import { provideHttpClient } from '@angular/common/http';

describe('GistService', () => {
  let service: GistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(GistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
