import { Component } from '@angular/core';
import { User } from './data-model/user-model';
import { FeedbackSubjectService } from './feedback-api/feedback-subject.service';
import { UserService } from './feedback-api/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'product-feedback-app';
  constructor(
    private userService: UserService,
    private feedbackService: FeedbackSubjectService
  ) {
    this.userService
      .getUserName('velvetround')
      .subscribe((response: User) =>
        this.feedbackService.setCurrentUser(response)
      );
  }
}
