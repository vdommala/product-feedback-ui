import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  private _isLoading: boolean = false;
  @Input()
  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }

  get isLoading() {
    return this._isLoading;
  }
  constructor() {}

  ngOnInit(): void {}
}
