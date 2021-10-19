import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from './data-model/user-model';
import { FeedbackSubjectService } from './feedback-api/feedback-subject.service';
import { LoaderService } from './feedback-api/loader.service';
import { UserService } from './feedback-api/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  title = 'product-feedback-app';
  destroySubject: Subject<void>;
  isLoading = false;
  constructor(
    private userService: UserService,
    private feedbackService: FeedbackSubjectService,
    private loaderService: LoaderService
  ) {
    this.destroySubject = new Subject<void>();
    this.loaderService
      .getLoading()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((value: boolean) => (this.isLoading = value));
    this.userService
      .getUserName('velvetround')
      .pipe(takeUntil(this.destroySubject))
      .subscribe((response: User) =>
        this.feedbackService.setCurrentUser(response)
      );
  }
  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
