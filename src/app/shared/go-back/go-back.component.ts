import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoaderService } from 'src/app/feedback-api/loader.service';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.css'],
})
export class GoBackComponent implements OnInit {
  stroke: string = '#4661E6';
  roadmapClass = {};
  @Input()
  set fromPage(pageName: string) {
    if (pageName === 'roadmap') {
      this.stroke = '#FFFFFF';
      this.roadmapClass = {
        white: pageName === 'roadmap',
      };
    }
  }
  @Output()
  goBackEvent = new EventEmitter<string>();
  constructor(private loader: LoaderService) {}

  ngOnInit(): void {}

  goBack(): void {
    this.goBackEvent.emit('hello');
  }
}
