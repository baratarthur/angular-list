import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CoreModule } from '@core/core.module';
import { Layout } from '@config/layout';

@Component({
  selector: 'app-link-button',
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,
  ],
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.scss']
})
export class LinkButtonComponent {
  public layouts = Layout;

  @Input() label: string;
  @Input() href: string[];

  constructor(
    private router: Router,
  ) {}

  goToLink(): void {
    this.router.navigate(this.href);
  }
}
