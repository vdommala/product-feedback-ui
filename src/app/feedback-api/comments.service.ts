import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../data-model/comment-model';

@Injectable()
export class CommentsService {
  private apiHost = environment.apiHost;
  private commentsUrl = '/comments';

  constructor(private http: HttpClient) {}

  saveComment(comment: Comment): Observable<Comment | string> {
    const path: string = '/save';

    return this.http.post<Comment | string>(
      this.apiHost + this.commentsUrl + path,
      comment
    );
  }
}
