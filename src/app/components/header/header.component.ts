import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GistStore } from '../../store/gists.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  store = inject(GistStore);

  searchControl: FormControl = new FormControl('');

  private subscription$: Subscription | undefined;

  ngOnInit() {
    this.subscription$ = this.searchControl.valueChanges.subscribe((query) => {
      this.store.udpateSearchQuery(query);
    });
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }

  onLogin() {
    console.log('Login Clicked!');
  }
}
