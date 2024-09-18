import { Component, Input } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { GistTableComponent } from '../gist-table/gist-table.component';
import { GistPreview } from '../../../models/interfaces';
import { TimeagoPipe } from '../../../pipes/timeago.pipe';
import { RouterLink } from '@angular/router';
import { GistCardComponent } from '../../gist-card/gist-card.component';

@Component({
  selector: 'app-gist-cards',
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
    TimeagoPipe,
    RouterLink,
    GistCardComponent,
  ],
  templateUrl: './gist-cards.component.html',
  styleUrl: './gist-cards.component.scss',
})
export class GistCardsComponent {
  @Input() cardDataSource: GistPreview[] = [];
}
