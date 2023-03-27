import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@dto/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) {}

  getData(): Observable<Data[]> {
    return this.http.get<Data[]>('assets/mocks/data.json');
  }
}
