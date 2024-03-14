import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchInputComponent implements OnInit {
  @Output() onSearch = new EventEmitter<string>();
  @Output() onClear = new EventEmitter();
  searchForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchQuery: ['', Validators.required],
    });
  }

  search() {
    if (this.searchForm.value.searchQuery)
      this.onSearch.emit(this.searchForm.value.searchQuery);
  }

  onClearSearch() {
    this.onClear.emit();
    this.searchForm.reset();
  }
}
