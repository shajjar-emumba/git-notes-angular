import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { GistStore } from '../../store/gists.store';
import { AuthStore } from '../../store/auth.store';
import { provideHttpClient } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

const mockAuthService = {
  signInWithPopup: jasmine.createSpy('signInWithPopup'),
  signOut: jasmine.createSpy('signOut'),
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        GistStore,
        AuthStore,
        provideHttpClient(),
        { provide: Auth, useValue: mockAuthService },
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
