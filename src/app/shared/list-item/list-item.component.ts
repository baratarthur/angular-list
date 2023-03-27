import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { Data } from '@dto/data';
import { Layout } from '@config/layout';
import { CoreModule } from '@core/core.module';
import { LinkButtonComponent } from '@shared/link-button/link-button.component';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,
    CurrencyPipe,
    LinkButtonComponent,
  ],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  public layoutTypes = Layout;
  @Input() data: Data;
  @Input() index: number;

  constructor() {}
}
