import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { Data } from '@dto/data';
import { DataService } from '@service/data.service';
import { sortStrategies } from '@config/sort';

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
          this.data = this.sortedByName(data);
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
        this.data = this.sortedByName(this.data);
        this.filteredData = this.sortedByName(this.filteredData);
        break;
      case 'download':
        this.data = this.sortedByDownloadSpeed(this.data);
        this.filteredData = this.sortedByDownloadSpeed(this.filteredData);
        break;
      case 'price':
        this.data = this.sortedByPrice(this.data);
        this.filteredData = this.sortedByPrice(this.filteredData);
        break;
    }
  }

  sortedByName(data: Data[]): Data[] {
    return data.sort(this.byName);
  }

  sortedByPrice(data: Data[]): Data[] {
    return data.sort(this.byPrice);
  }

  sortedByDownloadSpeed(data: Data[]): Data[] {
    return data.sort(this.byDownloadSpeed);
  }

  byName(a: Data, b: Data): number{
    return a.name > b.name ? 1 : -1;
  }

  byDownloadSpeed(a: Data, b: Data): number{
    return a.downloadSpeed < b.downloadSpeed ? 1 : -1;
  }

  byPrice(a: Data, b: Data): number{
    return a.price > b.price ? 1 : -1;
  }

}
