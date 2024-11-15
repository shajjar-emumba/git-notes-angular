import { Component, inject } from '@angular/core';
import { AuthStore } from '../../../store/auth.store';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [MatMenuModule, RouterLink],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent {
  authStore = inject(AuthStore);
  router = inject(Router);

  get userDisplayName() {
    const user = this.authStore.user();
    return user?.displayName || user?.email || 'User';
  }

  get userPhotoURL() {
    return this.authStore.user()?.photoURL || 'emumba-logo.png';
  }

  onSignOut() {
    this.router.navigateByUrl('/');
    this.authStore.signOut();
  }
}
