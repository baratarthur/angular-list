import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { dataMock } from '@core/mocks/data';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;
  const dataUrl = 'assets/mocks/data.json';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array with length', () => {
    service.getData().subscribe((data) => {
      const { length } = data;
      expect(length).toBeDefined();
    });

    const req = httpMock.expectOne(dataUrl);

    req.flush(dataMock);
  });

  it('should return a object type that contains all object information', () => {
    service.getData().subscribe((data) => {
      const { id, name, benefits, downloadSpeed, uploadSpeed, price } = data[0];
      
      expect(id).toBeDefined();
      expect(name).toBeDefined();
      expect(benefits).toBeDefined();
      expect(downloadSpeed).toBeDefined();
      expect(uploadSpeed).toBeDefined();
      expect(price).toBeDefined();
    });

    const req = httpMock.expectOne(dataUrl);

    req.flush(dataMock);
  });

});
