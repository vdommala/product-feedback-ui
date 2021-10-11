import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsMainComponent } from './suggestions-main.component';

describe('SuggestionsMainComponent', () => {
  let component: SuggestionsMainComponent;
  let fixture: ComponentFixture<SuggestionsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
