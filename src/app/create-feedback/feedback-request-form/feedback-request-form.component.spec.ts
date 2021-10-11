import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackRequestFormComponent } from './feedback-request-form.component';

describe('FeedbackRequestFormComponent', () => {
  let component: FeedbackRequestFormComponent;
  let fixture: ComponentFixture<FeedbackRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackRequestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
