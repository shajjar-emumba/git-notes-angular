import { Component, inject, Input } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe, TitleCasePipe } from '@angular/common';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { GistStore } from '../../../store/gists.store';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { TimeagoPipe } from '../../../pipes/timeago.pipe';
import { AuthStore } from '../../../store/auth.store';
import { RouterLink } from '@angular/router';
import { GistPreview } from '../../../models/interfaces';

@Component({
  selector: 'app-gist-table',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    DatePipe,
    TitleCasePipe,
    TruncatePipe,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    GistTableComponent,
    MatIconModule,
    MatIconButton,
    TimeagoPipe,
    RouterLink,
  ],
  templateUrl: './gist-table.component.html',
  styleUrl: './gist-table.component.scss',
})
export class GistTableComponent {
  @Input() dataSource!: MatTableDataSource<any>;
  gistStore = inject(GistStore);
  authStore = inject(AuthStore);

  displayedColumns: string[] = [
    'owner_name',
    'gist_name',
    'type',
    'updated_at',
    'actions',
  ];

  onStarGist(gist: GistPreview, e: Event) {
    e.stopPropagation();

    if (gist.isStarred) {
      this.gistStore.unstarGist(gist.id);
    } else {
      this.gistStore.starGist(gist.id);
    }
  }

  onForkGist(id: string, e: Event) {
    e.stopPropagation();
    this.gistStore.forkAGist(id);
  }
}
