import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FeedbackRequest } from '../data-model/feedback-model';
import { LoaderService } from '../feedback-api/loader.service';
import { RequestService } from '../feedback-api/request.service';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css'],
})
export class RoadmapComponent implements OnInit {
  count$: Observable<any>;
  requestByStatus$: Observable<any>;
  planned$: Observable<FeedbackRequest[]>;
  live$: Observable<FeedbackRequest[]>;
  progress$: Observable<FeedbackRequest[]>;
  status: string;

  constructor(
    private requestService: RequestService,
    private router: Router,
    private loader: LoaderService
  ) {
    this.count$ = new Observable<any>();
    this.requestByStatus$ = new Observable<any>();
    this.planned$ = new Observable<FeedbackRequest[]>();
    this.live$ = new Observable<FeedbackRequest[]>();
    this.progress$ = new Observable<FeedbackRequest[]>();
    this.status = 'PRGS';
    this.loader.showLoader();
  }

  ngOnInit(): void {
    const feedback$ = this.requestService.getAll();
    this.requestByStatus$ = feedback$.pipe(
      map((requests: FeedbackRequest[]) =>
        requests.reduce(
          (statusRequests: any, request) => {
            this.loader.hideLoader();
            let key = request.status.code;
            statusRequests[key].push(request);
            return statusRequests;
          },
          { PLND: [], PRGS: [], SUGT: [], LIVE: [] }
        )
      )
    );
  }

  setStatus(status: string) {
    this.status = status;
  }

  goBack(val: string) {
    this.router.navigateByUrl('/feedback');
  }
}
