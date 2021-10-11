import { Component, OnDestroy, OnInit } from '@angular/core';
import { concat, Subject } from 'rxjs';
import { switchMap, takeUntil, takeWhile } from 'rxjs/operators';
import { FeedbackRequest } from '../data-model/feedback-model';
import { StatusCount } from '../data-model/status-count';
import { FeedbackSubjectService } from '../feedback-api/feedback-subject.service';
import { RequestService } from '../feedback-api/request.service';

@Component({
  selector: 'app-suggestions-main',
  templateUrl: './suggestions-main.component.html',
  styleUrls: ['./suggestions-main.component.css'],
})
export class SuggestionsMainComponent implements OnInit, OnDestroy {
  open: boolean;
  filterCategory: string;
  feedbackRequests: FeedbackRequest[] | undefined;
  filteredRequests: FeedbackRequest[] | undefined;
  statusCount: StatusCount;
  selectedSort: string;

  private subject = new Subject<void>();

  constructor(
    private requestService: RequestService,
    private feedbackSubject: FeedbackSubjectService
  ) {
    this.open = false;
    this.filterCategory = '';
    this.statusCount = { planned: 0, live: 0, 'in-progress': 0 };
    this.selectedSort = 'Most Upvotes';
  }

  ngOnInit(): void {
    this.loadFeedbackRequests();
    this.loadCountStatus();
  }
  loadCountStatus() {
    this.requestService
      .getStatusCount()
      .pipe(takeUntil(this.subject))
      .subscribe((count: StatusCount) => {
        this.statusCount = count;
        console.log(count);
      });
  }

  private loadFeedbackRequests() {
    this.requestService
      .getAllFeedback()
      .pipe(takeUntil(this.subject))
      .subscribe((response) => {
        this.feedbackRequests = response.sort(
          (a: FeedbackRequest, b: FeedbackRequest) => b.upvotes - a.upvotes
        );
        this.filteredRequests = response;
        if (response.length > 0) {
          this.filterCategory = 'all';
        }
      });
  }

  toggleMenu(toggle: boolean) {
    this.open = toggle;
    console.log(this.open);
  }

  filter(category: string) {
    this.filteredRequests = this.feedbackRequests;
    if (category !== 'all') {
      this.filteredRequests = this.feedbackRequests?.filter(
        (request) => request.category.code === category
      );
    }
  }

  updateUpvotes() {
    let isDone = false;
    this.feedbackSubject
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

  sortBy(sortType: string) {
    const order = this.selectedSort.split(' ')[0];
    const property = this.selectedSort.split(' ')[1].toLowerCase();
    if (order === 'Most' && property === 'upvotes') {
      this.filteredRequests = this.filteredRequests?.sort(
        (a: any, b: any) => b[property] - a[property]
      );
    } else if (order === 'Most' && property === 'comments') {
      this.filteredRequests = this.filteredRequests?.sort(
        (a: any, b: any) => b[property].length - a[property].length
      );
    } else if (order === 'Least' && property === 'comments') {
      this.filteredRequests = this.filteredRequests?.sort(
        (a: any, b: any) => a[property].length - b[property].length
      );
    } else {
      this.filteredRequests = this.filteredRequests?.sort(
        (a: any, b: any) => a[property] - b[property]
      );
    }
  }

  ngOnDestroy(): void {
    this.subject.next();
    this.subject.complete();
  }
}
