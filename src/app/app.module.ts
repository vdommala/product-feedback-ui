import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateFeedbackComponent } from './create-feedback/create-feedback.component';
import { FeedbackRequestFormComponent } from './create-feedback/feedback-request-form/feedback-request-form.component';
import { AlertModule } from './alert/alert.module';
import { SuggestionsMainModule } from './suggestions-main/suggestions-main.module';
import { SharedModule } from './shared/shared.module';
import { FeedbackApiModule } from './feedback-api/feedback-api.module';
import { FeedbackDetailModule } from './feedback-detail/feedback-detail.module';
import { RoadmapModule } from './roadmap/roadmap.module';
import { CommentModule } from './comment/comment.module';
@NgModule({
  declarations: [
    AppComponent,
    CreateFeedbackComponent,
    FeedbackRequestFormComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    FeedbackApiModule.forRoot(),
    SuggestionsMainModule,
    FeedbackDetailModule,
    RoadmapModule,
    AlertModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
