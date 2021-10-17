import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoading: BehaviorSubject<boolean>;
  constructor() {
    this.isLoading = new BehaviorSubject<boolean>(true);
  }

  showLoader() {
    this.isLoading.next(true);
  }

  hideLoader() {
    this.isLoading.next(false);
  }

  getLoading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }
}
