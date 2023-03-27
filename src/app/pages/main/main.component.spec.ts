import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from 'src/app/shared/list-item/list-item.component';
import { DataHeaderComponent } from 'src/app/shared/data-header/data-header.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { dataMock } from '@core/mocks/data';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MainComponent,
        CommonModule,
        ListItemComponent,
        DataHeaderComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the app', () => {
    generateComponent();

    expect(component).toBeTruthy();
  });

  describe('initialization events', () => {
    beforeEach(() => {
      generateComponent();
    });

    it('should fetch data on init', () => {
      const fetchData = spyOn(component, 'fetchData');

      executeComponentInit();

      expect(fetchData).toHaveBeenCalled();
    });

  });

  describe('filter behavior', () => {
    beforeEach(() => {
      generateComponent();

      component.data = dataMock;
    });

    it('should filter a value and insert filtered data on a variable', () => {
      component.filter('a');

      expect(component.filteredData.length).toBe(1);
    });

    it('should filter uppercase values', () => {
      component.filter('A');

      expect(component.filteredData.length).toBe(1);
    });

    it('should display filtered values only', () => {
      component.filter('a');
      fixture.detectChanges();

      const element = fixture.debugElement;
      const listItems = element.queryAll(By.css('.list-item'));

      expect(listItems.length).toBe(1);
    });
  });

  describe('sort behavior', () => {
    beforeEach(() => {
      generateComponent();

      component.data = dataMock
    });

    it('should not change data length', () => {
      component.orderData('name');

      expect(component.data.length).toBe(2);
    });

    it('should order by name', () => {
      component.orderData('name');

      expect(component.data[0].name).toBe('a');
    });

    it('should order by downloadSpeed showing higher first', () => {
      component.orderData('download');

      expect(component.data[0].downloadSpeed).toBe(120);
    });

    it('should order by price showing cheaper first', () => {
      component.orderData('price');

      expect(component.data[0].price).toBe(100);
    });
  });

  function generateComponent(): void {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
  }

  function executeComponentInit(): void {
    component.ngOnInit();
    fixture.detectChanges();
  }
});
