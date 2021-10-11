import { Component, Input, OnInit } from '@angular/core';
import { AlertType } from './alert-type.enum';
import {
  state,
  trigger,
  style,
  transition,
  animate,
} from '@angular/animations';
import { AlertPosition } from './alert-position.enum';
import { Subject, Subscription } from 'rxjs';
import { AlertMessage } from './alert-message';
import { AlertService } from './alert.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '300px',
          opacity: 1,
        })
      ),

      state(
        'closed',
        style({
          height: '300px',
          opacity: 0.8,
        })
      ),
      transition('open => closed', [animate('2s')]),
      transition('closed => open', [animate('1s')]),
    ]),
  ],
})
export class AlertComponent implements OnInit {
  @Input()
  position: AlertPosition;

  private alertSubsciption!: Subscription;
  messages: AlertMessage[];

  constructor(private alertService: AlertService) {
    this.position = AlertPosition.TOP_RIGHT;
    //this.alertSubject$ = new Subject<void>();
    this.messages = [];
  }
  ngOnInit(): void {
    this.alertSubsciption = this.alertService
      .onAlertMessage()
      .subscribe((message) => this.handleAlertMessage(message));
  }

  handleAlertMessage(message: AlertMessage): void {
    if (
      this.position === AlertPosition.TOP_CENTER ||
      this.position === AlertPosition.TOP_LEFT ||
      this.position === AlertPosition.TOP_RIGHT
    ) {
      this.messages.unshift(message);
    } else {
      this.messages.push(message);
    }
    setTimeout(() => {
      this.removeMessage(message);
    }, message.duration);
  }   
  removeMessage(message: AlertMessage) {
    const index: number = this.messages.findIndex((e) => e.id === message.id);
    if (index > -1) {
      this.messages.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.alertSubsciption.unsubscribe();
  }
}
