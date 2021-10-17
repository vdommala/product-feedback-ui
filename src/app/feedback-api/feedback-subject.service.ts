import { Injectable } from '@angular/core';
import {
  Subject,
  BehaviorSubject,
  ReplaySubject,
  AsyncSubject,
  Observable,
} from 'rxjs';
import { FeedbackRequest } from '../data-model/feedback-model';
import { User } from '../data-model/user-model';

@Injectable()
export class FeedbackSubjectService {
  private feedback: BehaviorSubject<any>;
  private currentUser: BehaviorSubject<User>;

  constructor() {
    this.feedback = new BehaviorSubject<any>(null);
    this.currentUser = new BehaviorSubject<User>({
      userName: '',
      firstName: '',
      lastName: '',
      image: new Blob(),
    });
  }

  upvoteIncrement(request: FeedbackRequest) {
    console.log('hey');
    this.feedback.next(request);
  }

  onUpvoteChange() {
    return this.feedback.asObservable();
  }

  setCurrentUser(user: User) {
    this.currentUser.next(user);
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser.asObservable();
  }
}
