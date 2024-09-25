import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { GistStore } from './store/gists.store';
import { AuthStore } from './store/auth.store';
import { Auth } from '@angular/fire/auth';
import { routes } from './app.routes';

const mockAuthService = {
  signInWithPopup: jasmine.createSpy('signInWithPopup'),
  signOut: jasmine.createSpy('signOut'),
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        GistStore,
        AuthStore,
        { provide: Auth, useValue: mockAuthService },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
