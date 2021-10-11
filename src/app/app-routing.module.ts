import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFeedbackComponent } from './create-feedback/create-feedback.component';
import { CanDeactivateGuard } from './feedback-api/can-deactivate.guard';
import { FeedbackDetailComponent } from './feedback-detail/feedback-detail.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { SuggestionsMainComponent } from './suggestions-main/suggestions-main.component';

const routes: Routes = [
  { path: 'feedback', component: SuggestionsMainComponent },
  { path: 'detail/:id', component: FeedbackDetailComponent },
  {
    path: 'new',
    component: CreateFeedbackComponent,
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'edit/:id',
    component: CreateFeedbackComponent,
    canDeactivate: [CanDeactivateGuard],
  },

  {
    path: 'roadmap',
    component: RoadmapComponent,
  },
  { path: '**', redirectTo: 'feedback', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
