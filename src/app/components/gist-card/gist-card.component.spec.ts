import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GistCardComponent } from './gist-card.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthStore } from '../../store/auth.store';
import { GistStore } from '../../store/gists.store';
import { Auth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { GistPreview } from '../../models/interfaces';

const mockAuthService = {
  signInWithPopup: jasmine.createSpy('signInWithPopup'),
  signOut: jasmine.createSpy('signOut'),
};

const mockGist: GistPreview = {
  id: '123',
  owner_name: 'mockUser',
  gist_name: 'mockGistName',
  gist_file_raw_url: 'https://gist.github.com/raw/123/file1.txt',
  avatar_url: 'https://example.com/avatar.png',
  type: 'text/plain',
  updated_at: new Date().toISOString(),
  description: 'Mock Gist Description',
  isStarred: false,
};

describe('GistCardComponent', () => {
  let component: GistCardComponent;
  let fixture: ComponentFixture<GistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GistCardComponent],
      providers: [
        provideHttpClient(),
        provideRouter(routes),
        AuthStore,
        GistStore,
        { provide: Auth, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GistCardComponent);
    component = fixture.componentInstance;
    component.gist = mockGist;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
