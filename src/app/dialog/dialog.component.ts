import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  @Input()
  get message(): string {
    return this._message;
  }
  closed = new EventEmitter<boolean>();
  set message(message: string) {
    this._message = message;
  }
  private _message = '';

  private _result: Promise<any>;
  get result(): Promise<any> {
    return this._result;
  }

  constructor() {
    this._result = new Promise((resolve, reject) => {
      this.closed.subscribe((value) => {
        if (value) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  ngOnInit(): void {}
}
