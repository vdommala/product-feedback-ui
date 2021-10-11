import { NgModule } from '@angular/core';
import { SuggestionsMainComponent } from './suggestions-main.component';
import { FeedbackHeaderComponent } from './feedback-header/feedback-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NoFeedbackComponent } from './no-feedback/no-feedback.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SuggestionsMainComponent,
    FeedbackHeaderComponent,
    SidebarComponent,
    NoFeedbackComponent,
  ],
  imports: [SharedModule],
})
export class SuggestionsMainModule {}
