import { ComponentFixture, TestBed } from '@angular/core/testing';

import { countriesComponent } from './countries.component';

describe('countriesComponent', () => {
  let component: countriesComponent;
  let fixture: ComponentFixture<countriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ countriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(countriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
