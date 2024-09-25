import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GistPageComponent } from './gist-page.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthStore } from '../../store/auth.store';
import { GistStore } from '../../store/gists.store';
import { Auth } from '@angular/fire/auth';

const mockAuthService = {
  signInWithPopup: jasmine.createSpy('signInWithPopup'),
  signOut: jasmine.createSpy('signOut'),
};

describe('GistPageComponent', () => {
  let component: GistPageComponent;
  let fixture: ComponentFixture<GistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GistPageComponent],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        AuthStore,
        GistStore,
        { provide: Auth, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
