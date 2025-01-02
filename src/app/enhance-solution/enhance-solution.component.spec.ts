import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnhanceSolutionComponent } from './enhance-solution.component';

describe('EnhanceSolutionComponent', () => {
  let component: EnhanceSolutionComponent;
  let fixture: ComponentFixture<EnhanceSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnhanceSolutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnhanceSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
