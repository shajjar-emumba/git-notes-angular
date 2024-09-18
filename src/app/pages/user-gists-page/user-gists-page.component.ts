import { Component, inject } from '@angular/core';
import { GistStore } from '../../store/gists.store';
import { MatCard, MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { TimeagoPipe } from '../../pipes/timeago.pipe';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AuthStore } from '../../store/auth.store';
import { GistCardComponent } from '../../components/gist-card/gist-card.component';

@Component({
  selector: 'app-user-gists-page',
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
    TitleCasePipe,
    TruncatePipe,
    TimeagoPipe,
    MatProgressSpinner,
    GistCardComponent,
  ],
  templateUrl: './user-gists-page.component.html',
  styleUrl: './user-gists-page.component.scss',
})
export class UserGistsPageComponent {
  gistStore = inject(GistStore);
  authStore = inject(AuthStore);

  ngOnInit() {
    this.gistStore.getUserGists(this.authStore.user().accessToken);
  }
}
