import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortPipe } from './sort.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { FeedbackComponent } from './feedback/feedback.component';
import { AppRoutingModule } from '../app-routing.module';
import { GoBackComponent } from './go-back/go-back.component';
import { MediaDirective } from './media.directive';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    SortPipe,
    FeedbackComponent,
    GoBackComponent,
    MediaDirective,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    AppRoutingModule,
    FeedbackComponent,
    GoBackComponent,
    MediaDirective,
    SortPipe,
    LoaderComponent,
  ],
})
export class SharedModule {}
