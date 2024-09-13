import { Component, computed, inject, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GistStore } from '../../store/gists.store';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GistTableComponent } from '../../components/landing-page/gist-table/gist-table.component';
import { GistCardsComponent } from '../../components/landing-page/gist-cards/gist-cards.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    GistTableComponent,
    GistCardsComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  store = inject(GistStore);
  activeLayout = 'table';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  tabelDataSource = computed(() => {
    const dataSource = new MatTableDataSource(this.store.searchGists());
    dataSource.paginator = this.paginator;
    return dataSource;
  });

  cardDataSource = computed(() => this.store.searchGists().slice(0, 10));

  onPaginationChange(e: PageEvent) {
    this.cardDataSource = computed(() => {
      const startIndex = e.pageIndex * e.pageSize;
      const endIndex = startIndex + e.pageSize;
      return this.store.searchGists().slice(startIndex, endIndex);
    });
  }

  ngOnInit() {
    this.store.getAllGists();
  }
}
