import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FeedbackRequest } from 'src/app/data-model/feedback-model';
import { FeedbackSubjectService } from 'src/app/feedback-api/feedback-subject.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit, OnDestroy {
  @Input()
  set fromPage(page: string) {
    this._fromPage = page;
  }

  get fromPage(): string {
    return this._fromPage;
  }

  @Input()
  request: FeedbackRequest;
  @Output()
  incrementEvent = new EventEmitter();

  requestContainerClasses = {};

  private _fromPage!: string;

  constructor(private feedbackservice: FeedbackSubjectService) {
    this.request = {
      id: '',
      title: '',
      description: '',
      category: { id: '', code: '', name: '' },
      status: { id: '', code: '', name: '' },
      upvotes: 0,
      comments: [],
    };
  }

  ngOnInit(): void {
    this.requestContainerClasses = {
      planned:
        this.request?.status?.code === 'PLND' && this.fromPage === 'roadmap',
      'in-progress':
        this.request?.status?.code === 'PRGS' && this.fromPage === 'roadmap',
      live:
        this.request?.status?.code === 'LIVE' && this.fromPage === 'roadmap',
    };
  }

  increment(): void {
    this.request.upvotes += 1;
    this.feedbackservice.upvoteIncrement(this.request);
    this.incrementEvent.emit();
  }

  ngOnDestroy(): void {}
}
