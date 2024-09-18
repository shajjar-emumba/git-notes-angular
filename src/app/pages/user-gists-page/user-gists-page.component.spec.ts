import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGistsPageComponent } from './user-gists-page.component';

describe('UserGistsPageComponent', () => {
  let component: UserGistsPageComponent;
  let fixture: ComponentFixture<UserGistsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGistsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGistsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
