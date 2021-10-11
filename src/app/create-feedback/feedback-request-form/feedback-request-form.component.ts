import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/data-model/category-model';
import { FeedbackRequest } from 'src/app/data-model/feedback-model';
import { Status } from 'src/app/data-model/status-model';
import { CategoryService } from 'src/app/feedback-api/category.service';
import { StatusServiceService } from 'src/app/feedback-api/status-service.service';
import { DialogService } from '../../feedback-api/dialog.service';

@Component({
  selector: 'app-feedback-request-form',
  templateUrl: './feedback-request-form.component.html',
  styleUrls: ['./feedback-request-form.component.css'],
})
export class FeedbackRequestFormComponent implements OnInit, OnDestroy {
  @Input()
  formType!: string;
  @Input()
  formTitle!: string;
  @Input()
  backUrl!: string;
  @Input()
  set feedbackRequest(request: FeedbackRequest) {
    this._feedbackRequest = request;
    console.log(this._feedbackRequest);
    if (request.title !== '') {
      this.submitted = false;
      this.feedbackForm = this.fb.group({
        title: new FormControl(request.title, Validators.required),
        category: new FormControl(request.category, Validators.required),
        status: new FormControl(request.status, Validators.required),
        description: new FormControl(request.description, [
          Validators.required,
        ]),
      });
    }
  }
  get feedbackRequest(): FeedbackRequest {
    return this._feedbackRequest;
  }

  @Output()
  saveEvent: EventEmitter<FeedbackRequest> = new EventEmitter<FeedbackRequest>();
  @Output()
  deleteEvent: EventEmitter<FeedbackRequest> = new EventEmitter<FeedbackRequest>();

  private _feedbackRequest!: FeedbackRequest;
  submitted: boolean = false;
  categoryList: Category[] = [];
  statusList: Status[] = [];

  feedbackForm: FormGroup = new FormGroup({});
  service$: Subject<void>;
  get title(): AbstractControl {
    return this.feedbackForm.controls.title;
  }
  get categoryCd(): AbstractControl {
    return this.feedbackForm.controls.category;
  }
  get description(): AbstractControl {
    return this.feedbackForm.controls.description;
  }
  get titleInvalidAndTouched(): boolean {
    return (
      this.title.hasError('required') && (this.title.touched || this.submitted)
    );
  }
  get category_cdInvalidAndTouched(): boolean {
    return (
      this.categoryCd.hasError('required') &&
      (this.categoryCd.touched || this.submitted)
    );
  }
  get descriptionInvalidAndTouched(): boolean {
    return (
      this.description.hasError('required') &&
      (this.description.touched || this.submitted)
    );
  }
  constructor(
    private fb: FormBuilder,
    private categorySevice: CategoryService,
    private statusService: StatusServiceService,
    private dialogService: DialogService,
    private router: Router
  ) {
    this.feedbackForm = this.fb.group({
      title: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      description: new FormControl(null, [Validators.required]),
    });
    this.service$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.loadCategory();
    this.loadStatus();
  }

  loadCategory() {
    this.categorySevice
      .getCategory()
      .pipe(takeUntil(this.service$))
      .subscribe((response) => {
        this.categoryList = response;
      });
  }

  loadStatus() {
    this.statusService
      .getFeedBackStatus()
      .pipe(takeUntil(this.service$))
      .subscribe((response) => {
        this.statusList = response;
        if (this.formType === 'new') {
          this.initializeFeedbackForm();
        }
      });
  }

  initializeFeedbackForm(): void {
    const status: Status | undefined = this.statusList.find(
      (value) => value.code === 'SUGT'
    );
    this.feedbackForm = this.fb.group({
      title: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      status: new FormControl(status, Validators.required),
      description: new FormControl(null, [Validators.required]),
    });
    console.log(this.feedbackForm.value);
  }

  onSubmit(): void {
    this.submitted = !this.submitted;
    if (this.feedbackForm.valid && this.formType === 'new') {
      const request: FeedbackRequest = { ...this.feedbackForm.value };
      this.saveEvent.emit(request);
    } else if (this.feedbackForm.valid && this.formType === 'edit') {
      const request: FeedbackRequest = {
        ...this._feedbackRequest,
        ...this.feedbackForm.value,
      };
      this.saveEvent.emit(request);
    }
  }

  onCancel(): void {
    this.submitted = false;
    if (this.formType === 'new') {
      this.feedbackForm.reset();
      this.initializeFeedbackForm();
    } else {
      this.feedbackForm.patchValue({
        title: this.feedbackRequest.title,
        category: this.feedbackRequest.category,
        status: this.feedbackRequest.status,
        description: this.feedbackRequest.description,
      });
    }
  }

  onDelete(): void {
    this.dialogService
      .confirm('Are you sure you want to delete it permanently?')
      .subscribe((response) => {
        if (response) this.deleteEvent.emit(this.feedbackRequest);
      });
  }

  ngOnDestroy(): void {
    this.service$.next();
    this.service$.complete();
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.feedbackForm.dirty) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  goBack(): void {
    this.router.navigateByUrl(this.backUrl);
  }
}
