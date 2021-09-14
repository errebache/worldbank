import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorsGraphComponent } from './indicators-graph.component';

describe('IndicatorsGraphComponent', () => {
  let component: IndicatorsGraphComponent;
  let fixture: ComponentFixture<IndicatorsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorsGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
