import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LayoutWidth } from '@config/layout';
import { ListItemComponent } from './list-item.component';
import { CoreModule } from '@core/core.module';
import { CommonModule, CurrencyPipe } from '@angular/common';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  const desktopWidth = LayoutWidth.DESKTOP;
  const tabletWidth = LayoutWidth.TABLET - 10;
  const mobileWidth = LayoutWidth.MOBILE - 10;

  const desktopParagraphsNumber = 5;
  const tabletParagraphsNumber = 4;
  const mobileParagraphsNumber = 3;

  const dataClass = '.tarif__data';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ListItemComponent,
        CommonModule,
        CoreModule,
        CurrencyPipe,
      ]
    })
    .compileComponents();

    generateNewComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Conditional render', () => {
    beforeEach(() => {
      generateNewComponent();
    });

    it('should render all itens on desktop', () => {
      resizeWindow(desktopWidth);
      let allParagraphs = getAllElements(dataClass);

      expect(allParagraphs.length).toBe(desktopParagraphsNumber);
    });

    it('should render 4 itens on tablet', () => {
      resizeWindow(tabletWidth);
      let allParagraphs = getAllElements(dataClass);

      expect(allParagraphs.length).toBe(tabletParagraphsNumber);
    });

    it('should render 3 itens on mobile phone', () => {
      resizeWindow(mobileWidth);
      let allParagraphs = getAllElements(dataClass);

      expect(allParagraphs.length).toBe(mobileParagraphsNumber);
    });
  });

  function generateNewComponent(): void {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    component.data = {
      id: 1,
      name: 'some name',
      downloadSpeed: 120000000,
      uploadSpeed: 100000000,
      benefits: [],
      price: 123.45
    };
    fixture.detectChanges();
  }

  function resizeWindow(width: number): void {
    window.innerWidth = width;
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
  }

  function getAllElements(cssClass: string): DebugElement[] {
    let debugElement = fixture.debugElement;
    return debugElement.queryAll(By.css(cssClass))
  }
});
