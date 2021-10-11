import { HttpClient } from '@angular/common/http';
import {
  getMissingNgModuleMetadataErrorData,
  getSafePropertyAccessString,
} from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../data-model/user-model';

@Injectable()
export class UserService {
  private apiHost = environment.apiHost;
  private statusUrl = '/feedbackusers/';
  constructor(private http: HttpClient) {}

  getUserName(username: string): Observable<User> {
    return this.http.get<User>(this.apiHost + this.statusUrl + username);
  }
}
