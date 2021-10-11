import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';
import { environment } from 'src/environments/environment';
import { Reply } from '../data-model/reply-model';

@Injectable()
export class RepliesService {
  private apiHost = environment.apiHost;
  private repliesUrl = '/replies';
  constructor(private http: HttpClient) {}

  saveReply(reply: Reply): Observable<Reply> {
    return this.http.post<Reply>(
      this.apiHost + this.repliesUrl + '/save',
      reply
    );
  }
}
