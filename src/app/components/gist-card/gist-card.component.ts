import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TitleCasePipe } from '@angular/common';
import { TimeagoPipe } from '../../pipes/timeago.pipe';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../store/auth.store';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { GistPreview } from '../../models/interfaces';

@Component({
  selector: 'app-gist-card',
  standalone: true,
  imports: [
    MatCardModule,
    TitleCasePipe,
    TimeagoPipe,
    TruncatePipe,
    RouterLink,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './gist-card.component.html',
  styleUrl: './gist-card.component.scss',
})
export class GistCardComponent {
  @Input() gist!: GistPreview;
  authStore = inject(AuthStore);
}
