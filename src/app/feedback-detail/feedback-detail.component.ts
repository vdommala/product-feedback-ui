import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeWhile } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';
import { Comment } from '../data-model/comment-model';
import { FeedbackRequest } from '../data-model/feedback-model';
import { Reply } from '../data-model/reply-model';
import { User } from '../data-model/user-model';
import { CommentsService } from '../feedback-api/comments.service';
import { FeedbackSubjectService } from '../feedback-api/feedback-subject.service';
import { LoaderService } from '../feedback-api/loader.service';
import { RepliesService } from '../feedback-api/replies.service';
import { RequestService } from '../feedback-api/request.service';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.css'],
})
export class FeedbackDetailComponent implements OnInit, OnDestroy {
  request!: FeedbackRequest;
  private id: string = '';
  private currentUser!: User;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService,
    private userService: FeedbackSubjectService,
    private commentsService: CommentsService,
    private replyservice: RepliesService,
    private loader: LoaderService
  ) {
    this.loader.showLoader();
  }
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user: User) => {
      this.currentUser = user;
    });
    let isDone: boolean = false;
    console.log(this.route);
    this.route.paramMap
      .pipe(
        takeWhile(() => !isDone),
        switchMap((params: ParamMap) =>
          this.requestService.getFeedback(params.get('id')!)
        )
      )
      .subscribe((response) => {
        if (response) {
          isDone = true;
          this.request = response;
          this.id = this.request.id;
          this.loader.hideLoader();
        }
      });
  }

  goBack(val: string) {
    this.router.navigateByUrl('/feedback');
  }

  editFeedback(): void {
    this.router.navigateByUrl('/edit/' + this.id);
  }

  onPostComment(comment: string) {
    const feedbackComment: Comment = {
      id: '',
      requestId: this.id,
      content: comment,
      user: this.currentUser,
      replies: [],
    };
    let isDone: boolean = false;
    this.commentsService
      .saveComment(feedbackComment)
      .pipe(
        takeWhile(() => !isDone),
        switchMap((comment) => this.requestService.getFeedback(this.id))
      )
      .subscribe((response) => {
        if (response) {
          isDone = true;
          this.request = response;
          this.id = this.request.id;
        }
      });
  }

  onPostReply(reply: Reply) {
    reply.user = this.currentUser;
    let isDone: boolean = false;
    this.replyservice
      .saveReply(reply)
      .pipe(
        takeWhile(() => !isDone),
        switchMap((respone) => this.requestService.getFeedback(this.id))
      )
      .subscribe((response) => {
        if (response) {
          isDone = true;
          this.request = response;
          this.id = this.request.id;
        }
      });
  }
  updateUpvotes() {
    let isDone = false;
    this.userService
      .onUpvoteChange()
      .pipe(
        takeWhile(() => !isDone),
        switchMap((request) => this.requestService.updateUpvotes(request))
      )
      .subscribe((result) => {
        if (result) {
          isDone = true;
        }
      });
  }
}
