import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GistPageComponent } from './gist-page.component';

describe('GistPageComponent', () => {
  let component: GistPageComponent;
  let fixture: ComponentFixture<GistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GistPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
