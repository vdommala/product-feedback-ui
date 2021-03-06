import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertPosition } from '../alert/alert-position.enum';
import { AlertType } from '../alert/alert-type.enum';
import { AlertService } from '../alert/alert.service';
import { FeedbackRequest } from '../data-model/feedback-model';
import { RequestService } from '../feedback-api/request.service';
import { FeedbackRequestFormComponent } from './feedback-request-form/feedback-request-form.component';
@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css'],
})
export class CreateFeedbackComponent implements OnInit {
  formType!: string;
  formTitle!: string;
  backUrl!: string;
  feedbackRequest: FeedbackRequest;
  AlertPosition = AlertPosition;
  AlertType = AlertType;
  @ViewChild(FeedbackRequestFormComponent, { static: true })
  private child!: FeedbackRequestFormComponent;

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.feedbackRequest = {
      id: '',
      title: '',
      description: '',
      category: { id: '', code: '', name: '' },
      status: { id: '', code: '', name: '' },
      upvotes: 0,
      comments: [],
    };

    this.route.url.subscribe((value: UrlSegment[]) => {
      this.formType = value[0].path;
      if (this.formType === 'new') {
        this.createSetUp();
      } else {
        this.editSetUp();
      }
    });
  }

  ngOnInit(): void {}

  createSetUp() {
    this.formTitle = 'Create New Feedback';
    this.backUrl = '/feedback';
  }

  editSetUp() {
    this.route.paramMap
      .pipe(
        switchMap((params: Params) =>
          this.requestService.getFeedback(params.get('id'))
        )
      )
      .subscribe((response) => {
        this.feedbackRequest = { ...response };
        this.formTitle = `Editing  '${response.title} '`;
        this.backUrl = '/detail/' + this.feedbackRequest.id;
      });
  }

  saveFeedback(feedback: FeedbackRequest): void {
    if (this.formType === 'new') {
      this.saveNewFeedback(feedback);
    } else {
      this.updateFeedback(feedback);
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    return this.child.canDeactivate();
  }

  saveNewFeedback(feedback: FeedbackRequest) {
    this.requestService.saveFeedback(feedback).subscribe((response) => {
      if (response.id !== null) {
        this.feedbackRequest = response;
        this.alertService.alert('Feedback is created', AlertType.SUCCESS);
      }
    });
  }

  updateFeedback(feedback: FeedbackRequest) {
    this.requestService.updateFeedback(feedback).subscribe((response) => {
      if (response.id !== null) {
        this.feedbackRequest = response;
        this.alertService.alert(
          `${this.feedbackRequest.title} feedback is updated successfully`,
          AlertType.SUCCESS
        );
      }
    });
  }

  deleteFeedback(feedback: FeedbackRequest) {
    this.requestService
      .deleteFeedback(feedback.id)
      .subscribe((response: any) => {
        console.log(response);
        if (response.message === 'Deleted Successfully') {
          this.alertService.alert(
            `${this.feedbackRequest.title} is deleted`,
            AlertType.SUCCESS,
            1000
          );
          setTimeout(() => this.router.navigate(['/feedback']), 1000);
        }
      });
  }
}
