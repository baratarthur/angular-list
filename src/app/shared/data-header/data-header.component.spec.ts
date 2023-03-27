import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataHeaderComponent } from './data-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('DataHeaderComponent', () => {
  let component: DataHeaderComponent;
  let fixture: ComponentFixture<DataHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DataHeaderComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
