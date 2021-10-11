import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../data-model/status-model';
import { environment } from 'src/environments/environment';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class StatusServiceService {
  private apiHost = environment.apiHost;
  private statusUrl = '/status';
  constructor(private http: HttpClient) {}

  getFeedBackStatus(): Observable<Status[]> {
    console.log(this.apiHost);
    return this.http.get<Status[]>(this.apiHost + this.statusUrl);
  }
}
