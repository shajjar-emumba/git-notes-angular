import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGistComponent } from './manage-gist.component';

describe('ManageGistComponent', () => {
  let component: ManageGistComponent;
  let fixture: ComponentFixture<ManageGistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageGistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageGistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
