import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPerformanceComponent } from './work-performance.component';

describe('WorkPerformanceComponent', () => {
  let component: WorkPerformanceComponent;
  let fixture: ComponentFixture<WorkPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkPerformanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
