import {
  Directive,
  HostListener,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Layout, LayoutWidth } from '@config/layout';

@Directive({
  selector: '[appHideOn]'
})
export class HideOnDirective {
  private viewCreated = false;
  private screenLayoutToHide = Layout.DESKTOP;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @HostListener('window:resize', ["$event"])
  updateWindowValue() {
    this.decideIfShouldHide();
  }

  @Input() set appHideOn(screen: Layout) {
    this.screenLayoutToHide = screen;
    this.decideIfShouldHide();
  }

  private decideIfShouldHide() {
    switch(this.screenLayoutToHide) {
      case Layout.MOBILE:
        this.shouldHide(LayoutWidth.MOBILE);
        break;
      case Layout.TABLET:
        this.shouldHide(LayoutWidth.TABLET);
        break;
    }
  }

  private shouldHide(layoutWidth: LayoutWidth) {
    const windowWidth = this.getWindowWidth();

    if(windowWidth > layoutWidth && !this.viewCreated) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.viewCreated = true;
    } else if (windowWidth < layoutWidth && this.viewCreated) {
      this.viewContainer.clear();
      this.viewCreated = false;
    }
  }

  getWindowWidth(): number {
    return window.innerWidth;
  }

}
