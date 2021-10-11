import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { skip } from 'rxjs/operators';
import { CategoryService } from './category.service';
import { StatusServiceService } from './status-service.service';
import { RequestService } from './request.service';
import { UserService } from './user.service';
import { CanDeactivateGuard } from './can-deactivate.guard';
import { FeedbackSubjectService } from './feedback-subject.service';
import { DialogService } from './dialog.service';
import { CommentsService } from './comments.service';
import { RepliesService } from './replies.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class FeedbackApiModule {
  constructor(@Optional() @SkipSelf() parentModule?: FeedbackApiModule) {
    if (parentModule) {
      throw new Error(
        'FeedbackApiModule is already loaded. Import it in the AppModule only'
      );
    }
  }
  static forRoot(): ModuleWithProviders<FeedbackApiModule> {
    return {
      ngModule: FeedbackApiModule,
      providers: [
        CategoryService,
        StatusServiceService,
        RequestService,
        UserService,
        CommentsService,
        RepliesService,
        CanDeactivateGuard,
        FeedbackSubjectService,
        DialogService,
      ],
    };
  }
}
