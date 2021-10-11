import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../data-model/category-model';

@Injectable()
export class CategoryService {
  private apiHost = environment.apiHost;
  private categoryUrl = '/category';

  constructor(private http: HttpClient) {}

  getCategory(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.apiHost + this.categoryUrl)
      .pipe(shareReplay());
  }
}
