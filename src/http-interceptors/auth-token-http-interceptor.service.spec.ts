import { TestBed } from '@angular/core/testing';

import { AuthTokenHttpInterceptorService } from './auth-token-http-interceptor.service';

describe('AuthTokenHttpInterceptorService', () => {
  let service: AuthTokenHttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthTokenHttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
