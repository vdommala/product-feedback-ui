import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/data-model/category-model';
import { FilterType } from 'src/app/data-model/filter-type.enum';
import { StatusCount } from 'src/app/data-model/status-count';
import { CategoryService } from 'src/app/feedback-api/category.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input()
  open: boolean;
  @Input()
  filterCategory: string;
  @Input()
  statusCount: StatusCount;

  category: Category[] = [];

  @Output()
  filterEvent = new EventEmitter<string>();
  public FilterType = FilterType;

  constructor(private categoryService: CategoryService) {
    this.open = false;
    this.filterCategory = 'all';
    this.statusCount = { planned: 0, live: 0, 'in-progress': 0 };
  }

  ngOnInit(): void {
    this.categoryService
      .getCategory()
      .subscribe((category: Category[]) => (this.category = category));
  }

  filter(category: string): void {
    console.log(category);
    this.filterEvent.emit(category);
  }

  disabled() {
    const { planned, live, 'in-progress': inprogress } = this.statusCount;

    if (planned !== 0 || live !== 0 || inprogress !== 0) {
      return false;
    }
    return true;
  }
}
