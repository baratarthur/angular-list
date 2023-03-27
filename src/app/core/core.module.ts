import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternetSpeedPipe } from '@pipe/internet-speed.pipe';
import { HideOnDirective } from '@directive/hide-on.directive';

@NgModule({
  declarations: [
    InternetSpeedPipe,
    HideOnDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InternetSpeedPipe,
    HideOnDirective,
  ],
})
export class CoreModule {}
