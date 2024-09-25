import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuComponent } from './user-menu.component';
import { Auth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';

const mockAuthService = {
  signInWithPopup: jasmine.createSpy('signInWithPopup'),
  signOut: jasmine.createSpy('signOut'),
};

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMenuComponent],
      providers: [
        { provide: Auth, useValue: mockAuthService },
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
