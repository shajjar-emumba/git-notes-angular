import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GistCardsComponent } from './gist-cards.component';

describe('GistCardsComponent', () => {
  let component: GistCardsComponent;
  let fixture: ComponentFixture<GistCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GistCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GistCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
