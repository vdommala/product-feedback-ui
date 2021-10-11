import { NgModule } from '@angular/core';
import { FeedbackDetailComponent } from './feedback-detail.component';
import { SharedModule } from '../shared/shared.module';
import { CommentModule } from '../comment/comment.module';

@NgModule({
  declarations: [FeedbackDetailComponent],
  imports: [SharedModule, CommentModule],
})
export class FeedbackDetailModule {}
