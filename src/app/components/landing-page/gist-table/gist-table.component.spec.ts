import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GistTableComponent } from './gist-table.component';
import { provideHttpClient } from '@angular/common/http';
import { GistStore } from '../../../store/gists.store';
import { AuthStore } from '../../../store/auth.store';
import { Auth } from '@angular/fire/auth';

const mockAuthService = {
  signInWithPopup: jasmine.createSpy('signInWithPopup'),
  signOut: jasmine.createSpy('signOut'),
};

describe('GistTableComponent', () => {
  let component: GistTableComponent;
  let fixture: ComponentFixture<GistTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GistTableComponent],
      providers: [
        provideHttpClient(),
        GistStore,
        AuthStore,
        { provide: Auth, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GistTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
