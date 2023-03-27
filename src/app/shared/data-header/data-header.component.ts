import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { sortStrategies, sortTypes } from '@config/sort';

@Component({
  selector: 'app-data-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './data-header.component.html',
  styleUrls: ['./data-header.component.scss'],
})
export class DataHeaderComponent implements OnInit, OnDestroy {
  public serchValue: FormControl = new FormControl("");
  public orderValue: FormControl = new FormControl("name");
  public sortTypes = sortTypes;

  @Output() onFilter = new EventEmitter<string>();
  @Output() onSort = new EventEmitter<sortStrategies>();

  private subscrptions$: Subscription = new Subscription;

  ngOnDestroy(): void {
    this.subscrptions$.unsubscribe();
  }

  ngOnInit(): void {
    this.bindFormActions();
  }

  bindFormActions(): void {
    this.subscrptions$.add(
      this.serchValue.valueChanges.subscribe({
        next: this.emmitFilterEvent.bind(this)
      })
    );

    this.subscrptions$.add(
      this.orderValue.valueChanges.subscribe({
        next: this.emmitSortEvent.bind(this)
      })
    );
  }

  emmitFilterEvent(filter: string): void {
    this.onFilter.emit(filter);
  }

  emmitSortEvent(sortStrategy: sortStrategies): void {
    this.onSort.emit(sortStrategy);
  }

}
