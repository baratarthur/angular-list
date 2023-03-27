import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkButtonComponent } from './link-button.component';
import { By } from '@angular/platform-browser';
import { LayoutWidth } from '@core/config/layout';

describe('LinkButtonComponent', () => {
  let component: LinkButtonComponent;
  let fixture: ComponentFixture<LinkButtonComponent>;

  const desktopWidth = LayoutWidth.DESKTOP;
  const tabletWidth = LayoutWidth.TABLET - 10;
  const mobileWidth = LayoutWidth.MOBILE - 10;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LinkButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('layout', () => {
    it('show button label on desktop layout', () => {
      const el = fixture.debugElement;
      
      resizeWindow(desktopWidth);
  
      const buttonContent = el.queryAll(By.css("button span"));
  
      expect(buttonContent.length).toBe(2);
    });
  
    it('show button label on tablet layout', () => {
      const el = fixture.debugElement;
      
      resizeWindow(tabletWidth);
  
      const buttonContent = el.queryAll(By.css("button span"));
  
      expect(buttonContent.length).toBe(2);
    });
  
    it('should hide button label on mobile layout', () => {
      const el = fixture.debugElement;
      
      resizeWindow(mobileWidth);
  
      const buttonContent = el.queryAll(By.css("button span"));
  
      expect(buttonContent.length).toBe(1);
    });

    function resizeWindow(width: number): void {
      window.innerWidth = width;
      window.dispatchEvent(new Event("resize"));
      fixture.detectChanges();
    }
  });

  it('should call goTo function on click button', () => {
    const el = fixture.debugElement;
    const button = el.query(By.css("button")).nativeElement as HTMLButtonElement;
    const spy = spyOn(component, "goToLink");

    button.click();

    expect(spy).toHaveBeenCalled();
  });

});
