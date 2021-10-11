import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AlertMessage } from './alert-message';
import { AlertType } from './alert-type.enum';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private defaultDuration: number;
  private alertMessagesSource: Subject<AlertMessage>;

  constructor() {
    this.defaultDuration = 2000;
    this.alertMessagesSource = new Subject<AlertMessage>();
  }

  public alert(
    message: string,
    type: AlertType,
    duration: number = this.defaultDuration
  ): void {
    this.alertMessagesSource.next(new AlertMessage(message, type, duration));
  }

  public onAlertMessage(): Observable<AlertMessage> {
    return this.alertMessagesSource.asObservable();
  }
}
