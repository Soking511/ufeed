import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovativeSolutionsComponent } from './innovative-solutions.component';

describe('InnovativeSolutionsComponent', () => {
  let component: InnovativeSolutionsComponent;
  let fixture: ComponentFixture<InnovativeSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnovativeSolutionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnovativeSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
