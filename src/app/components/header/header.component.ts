import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GistStore } from '../../store/gists.store';
import { Subscription } from 'rxjs';
import { AuthStore } from '../../store/auth.store';

import { UserMenuComponent } from './user-menu/user-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    UserMenuComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  gistStore = inject(GistStore);
  authStore = inject(AuthStore);

  searchControl: FormControl = new FormControl('');

  private subscription$: Subscription | undefined;

  ngOnInit() {
    this.subscription$ = this.searchControl.valueChanges.subscribe((query) => {
      this.gistStore.udpateSearchQuery(query);
    });
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }
}
