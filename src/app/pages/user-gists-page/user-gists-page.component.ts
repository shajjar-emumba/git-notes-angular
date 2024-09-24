import { Subscription } from 'rxjs';
import { Component, inject } from '@angular/core';
import { GistStore } from '../../store/gists.store';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { TimeagoPipe } from '../../pipes/timeago.pipe';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AuthStore } from '../../store/auth.store';
import { GistCardComponent } from '../../components/gist-card/gist-card.component';
import { EmailtoDisplayNamePipe } from '../../pipes/emailto-display-name.pipe';

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
    EmailtoDisplayNamePipe,
  ],
  templateUrl: './user-gists-page.component.html',
  styleUrl: './user-gists-page.component.scss',
})
export class UserGistsPageComponent {
  gistStore = inject(GistStore);
  authStore = inject(AuthStore);
  activatedRoute = inject(ActivatedRoute);
  isStarredView: boolean = false;

  private subscription$: Subscription | undefined;

  ngOnInit() {
    this.subscription$ = this.activatedRoute.data.subscribe((data) => {
      if (data['type'] === 'all') {
        this.loadUserGists();
      } else {
        this.loadStarredGists();
      }
    });
  }

  private loadUserGists() {
    this.gistStore.getUserGists();
    this.isStarredView = false;
  }

  private loadStarredGists() {
    this.gistStore.getUserStarredGists();
    this.isStarredView = true;
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }
}
