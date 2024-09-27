import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GistStore } from '../../store/gists.store';
import { AuthStore } from '../../store/auth.store';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { JsonPipe, TitleCasePipe } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { TimeagoPipe } from '../../pipes/timeago.pipe';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-gist-page',
  standalone: true,
  imports: [
    MatIconModule,
    MatIconButton,
    JsonPipe,
    TitleCasePipe,
    TruncatePipe,
    TimeagoPipe,
    LoadingSpinnerComponent,
  ],
  templateUrl: './gist-page.component.html',
  styleUrl: './gist-page.component.scss',
})
export class GistPageComponent {
  activatedRoute = inject(ActivatedRoute);
  gistStore = inject(GistStore);
  authStore = inject(AuthStore);

  ngOnInit() {
    const gistID = this.activatedRoute.snapshot.paramMap.get('id');
    if (gistID) {
      this.gistStore.getGistById(gistID);
    }
  }
}
