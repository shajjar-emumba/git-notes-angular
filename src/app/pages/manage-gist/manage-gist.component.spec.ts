import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGistComponent } from './manage-gist.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { GistStore } from '../../store/gists.store';
import { AuthStore } from '../../store/auth.store';
import { Auth } from '@angular/fire/auth';
import { routes } from '../../app.routes';

const mockAuthService = {
  signInWithPopup: jasmine.createSpy('signInWithPopup'),
  signOut: jasmine.createSpy('signOut'),
};

describe('ManageGistComponent', () => {
  let component: ManageGistComponent;
  let fixture: ComponentFixture<ManageGistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageGistComponent],
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        GistStore,
        AuthStore,
        { provide: Auth, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageGistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
