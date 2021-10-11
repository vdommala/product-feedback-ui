import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackHeaderComponent } from './feedback-header.component';

describe('FeedbackHeaderComponent', () => {
  let component: FeedbackHeaderComponent;
  let fixture: ComponentFixture<FeedbackHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
