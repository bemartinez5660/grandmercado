import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class PaginationComponent implements OnInit {
  @Input() current: number = 0;
  @Input() page_total: number = 0;

  @Output() onPage: EventEmitter<number> = new EventEmitter<number>();
  @Output() onNext: EventEmitter<number> = new EventEmitter<number>();
  @Output() onPrev: EventEmitter<number> = new EventEmitter<number>();
  @Output() onFirst: EventEmitter<number> = new EventEmitter<number>();
  @Output() onLast: EventEmitter<number> = new EventEmitter<number>();

  public pages: number[] = [];

  constructor() {}

  ngOnInit(): void {}

  public onGoTo(page: number) {
    this.onPage.emit(page);
  }
  public onNextPage(): void {
    this.onNext.emit(this.current);
  }
  public onPreviousPage(): void {
    this.onPrev.next(this.current);
  }

  private getPages(current: number, total: number): number[] {
    if (total <= 7) {
      return [...Array(total).keys()].map((x) => ++x);
    }

    if (current > 5) {
      if (current >= total - 4) {
        return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, -1, current - 1, current, current + 1, -1, total];
      }
    }

    return [1, 2, 3, 4, 5, -1, total];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['current'] && changes['current'].currentValue) ||
      (changes['page_total'] && changes['page_total'].currentValue)
    ) {
      this.pages = this.getPages(this.current, this.page_total);
    }
  }
}
