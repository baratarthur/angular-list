import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { Data } from '@dto/data';
import { DataService } from '@service/data.service';
import { DONT_SWITCH, SWITCH, sortStrategies } from '@config/sort';

import { ListItemComponent } from '@shared/list-item/list-item.component';
import { DataHeaderComponent } from '@shared/data-header/data-header.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    ListItemComponent,
    DataHeaderComponent,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public data: Data[];
  public filteredData: Data[] = [];

  private subscriptions$ = new Subscription;

  constructor(
    private dataService: DataService,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.subscriptions$.add(
      this.dataService.getData().subscribe({
        next: (data: Data[]) => {
          this.data = this.sortedBy(this.alphabeticNameOrder, data);
        }
      })
    );
  }

  filter(value: string): void {
    this.filteredData = this.data.filter(
      this.byNameFilter(value)
    );
  }

  byNameFilter(value: string): (item: Data) => boolean {
    return (item: Data) =>  item.name.toLowerCase().includes(value.toLowerCase());
  }

  orderData(value: sortStrategies): void {
    switch(value) {
      case 'name':
        this.data = this.sortedBy(this.alphabeticNameOrder, this.data);
        this.filteredData = this.sortedBy(this.alphabeticNameOrder, this.filteredData);
        break;
      case 'download':
        this.data = this.sortedBy(this.descendingDownloadSpeedOrder, this.data);
        this.filteredData = this.sortedBy(this.descendingDownloadSpeedOrder, this.filteredData);
        break;
      case 'price':
        this.data = this.sortedBy(this.risingPriceOrder, this.data);
        this.filteredData = this.sortedBy(this.risingPriceOrder, this.filteredData);
        break;
    }
  }

  sortedBy(
    callback: (data: Data, dataToCompare: Data) => number,
    data: Data[]
  ): Data[] {
    return data.sort(callback);
  }

  alphabeticNameOrder(data: Data, dataToCompare: Data): number {
    return data.name < dataToCompare.name ? SWITCH : DONT_SWITCH;
  }

  descendingDownloadSpeedOrder(data: Data, dataToCompare: Data): number {
    return data.downloadSpeed > dataToCompare.downloadSpeed ? SWITCH : DONT_SWITCH;
  }

  risingPriceOrder(data: Data, dataToCompare: Data): number {
    return data.price < dataToCompare.price ? SWITCH : DONT_SWITCH;
  }

}
