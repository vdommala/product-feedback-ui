import {
  HttpClient,
  HttpContext,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FeedbackRequest } from '../data-model/feedback-model';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { StatusCount } from '../data-model/status-count';

@Injectable()
export class RequestService {
  private apiHost = environment.apiHost;
  private requestUrl = '/requests';
  constructor(private http: HttpClient) {}

  saveFeedback(feedback: FeedbackRequest): Observable<FeedbackRequest> {
    const path = '/save';
    return this.http.post<FeedbackRequest>(
      this.apiHost + this.requestUrl + path,
      feedback
    );
  }

  getAll(): Observable<FeedbackRequest[]> {
    return this.http
      .get<FeedbackRequest[]>(this.apiHost + this.requestUrl)
      .pipe(shareReplay());
  }

  getAllFeedback(): Observable<FeedbackRequest[]> {
    const path = '/suggestions';
    return this.http.get<FeedbackRequest[]>(
      this.apiHost + this.requestUrl + path
    );
  }

  getCountLive(): Observable<number> {
    const path = '/count/live';
    return this.http.get<number>(this.apiHost + this.requestUrl + path);
  }

  getCountPlanned(): Observable<number> {
    const path = '/count/planned';
    return this.http.get<number>(this.apiHost + this.requestUrl + path);
  }

  getCountInprogress(): Observable<number> {
    const path = '/count/inprogress';
    return this.http.get<number>(this.apiHost + this.requestUrl + path);
  }

  getStatusCount(): Observable<StatusCount> {
    return forkJoin([
      this.getCountPlanned(),
      this.getCountLive(),
      this.getCountInprogress(),
    ]).pipe(
      map((response) => {
        return {
          planned: response[0],
          live: response[1],
          'in-progress': response[2],
        };
      })
    );
  }

  updateUpvotes(feedback: FeedbackRequest): Observable<FeedbackRequest> {
    const path = '/save/upvotes';
    return this.http.post<FeedbackRequest>(
      this.apiHost + this.requestUrl + path,
      feedback
    );
  }

  getFeedback(id: string): Observable<FeedbackRequest> {
    const path = '/detail';
    const options = {
      params: new HttpParams().set('id', id),
    };

    return this.http.get<FeedbackRequest>(
      this.apiHost + this.requestUrl + path,
      options
    );
  }

  updateFeedback(request: FeedbackRequest): Observable<FeedbackRequest> {
    console.log(request);
    const path = '/save/changes';
    return this.http.post<FeedbackRequest>(
      this.apiHost + this.requestUrl + path,
      request
    );
  }

  deleteFeedback(id: string): Observable<any> {
    const path = '/delete';
    const options = {
      params: new HttpParams().set('id', id),
    };
    return this.http.delete<any>(
      this.apiHost + this.requestUrl + path,
      options
    );
  }
}
