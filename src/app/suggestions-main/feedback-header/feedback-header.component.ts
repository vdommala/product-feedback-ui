import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RangeValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-feedback-header',
  templateUrl: './feedback-header.component.html',
  styleUrls: ['./feedback-header.component.css'],
})
export class FeedbackHeaderComponent implements OnInit {
  open: boolean;
  @Output()
  toggleEvent = new EventEmitter<boolean>();

  constructor() {
    this.open = false;
  }

  ngOnInit(): void {}

  ontoggle() {
    this.open = !this.open;
    this.toggleEvent.emit(this.open);
  }
}
