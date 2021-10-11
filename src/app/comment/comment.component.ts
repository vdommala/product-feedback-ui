import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { defaultThrottleConfig } from 'rxjs/internal/operators/throttle';
import { debounce, debounceTime, throttleTime } from 'rxjs/operators';
import { Comment } from '../data-model/comment-model';
import { Reply } from '../data-model/reply-model';

export type OpenReply = {
  open: boolean;
  repliesOpen: boolean[];
};

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  private _comments: Comment[] = [];
  openReply: OpenReply[];
  @Input()
  set comments(comments: Comment[]) {
    if (comments !== undefined) {
      this._comments = comments;
      this.setOpenReply(comments);
    }
  }

  get comments() {
    return this._comments;
  }

  @Output()
  postCommentEvent: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  postReplyEvent: EventEmitter<Reply> = new EventEmitter<Reply>();

  comment: FormControl;
  rcommentLength: number = 250;
  reply: FormControl;
  replyToReply: FormControl;

  constructor(private fb: FormBuilder) {
    this.openReply = [];
    this.comment = new FormControl(null, Validators.maxLength(250));
    this.reply = new FormControl(null);
    this.replyToReply = new FormControl(null);
  }

  ngOnInit(): void {
    this.comment.valueChanges
      .pipe(throttleTime(500))
      .subscribe((value) => (this.rcommentLength = 250 - value.length));
  }
  onCommentReply(index: number) {
    this.openReply[index].open = !this.openReply[index].open;
  }

  onReply(commentIndex: number, replyIndex: number) {
    this.openReply[commentIndex].repliesOpen[replyIndex] =
      !this.openReply[commentIndex].repliesOpen[replyIndex];
  }
  setOpenReply(comments: Comment[]) {
    for (let i = 0; i < comments.length; i++) {
      this.openReply[i] = { open: false, repliesOpen: [] };
      if (comments[i].replies.length > 0) {
        for (let j = 0; j < comments[i].replies.length; j++) {
          this.openReply[i].repliesOpen[j] = false;
        }
      }
    }
  }

  postComment() {
    if (this.comment.value !== null || this.comment.value !== '') {
      console.log('error');
    }
    const content: string = this.comment.value;
    this.postCommentEvent.emit(content);
    this.comment.reset('');
  }

  postReply(id: number): void {
    const comment: Comment = this.comments[id];
    if (this.reply.value !== null || this.reply.value !== '') {
      const reply: Reply = {
        id: '',
        commentId: comment.id,
        replytoId: '',
        replyTo: comment.user.userName,
        content: this.reply.value,
        user: { userName: '', firstName: '', lastName: '', image: new Blob() },
      };
      this.postReplyEvent.emit(reply);
      this.reply.reset();
      this.openReply[id].open = false;
    }
  }
  postReplyReply(id: number, rid: number): void {
    const comment: Comment = this.comments[id];
    const commentReply: Reply = comment.replies[rid];
    if (this.reply.value !== null || this.reply.value !== '') {
      const reply: Reply = {
        id: '',
        commentId: comment.id,
        replytoId: commentReply.id,
        replyTo: commentReply.user.userName,
        content: this.replyToReply.value,
        user: { userName: '', firstName: '', lastName: '', image: new Blob() },
      };
      this.postReplyEvent.emit(reply);
      this.replyToReply.reset();
      this.openReply[id].repliesOpen[rid] = false;
    }
  }
}
