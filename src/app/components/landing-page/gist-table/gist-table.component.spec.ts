import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GistTableComponent } from './gist-table.component';

describe('GistTableComponent', () => {
  let component: GistTableComponent;
  let fixture: ComponentFixture<GistTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GistTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GistTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
