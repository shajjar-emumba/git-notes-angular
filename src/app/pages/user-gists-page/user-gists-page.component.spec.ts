import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGistsPageComponent } from './user-gists-page.component';
import { provideHttpClient } from '@angular/common/http';
import { GistStore } from '../../store/gists.store';
import { AuthStore } from '../../store/auth.store';
import { Auth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

const mockAuthService = {
  signInWithPopup: jasmine.createSpy('signInWithPopup'),
  signOut: jasmine.createSpy('signOut'),
};

describe('UserGistsPageComponent', () => {
  let component: UserGistsPageComponent;
  let fixture: ComponentFixture<UserGistsPageComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [UserGistsPageComponent],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        GistStore,
        AuthStore,
        { provide: Auth, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserGistsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
