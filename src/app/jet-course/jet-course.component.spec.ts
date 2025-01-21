import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JetCourseComponent } from './jet-course.component';

describe('JetCourseComponent', () => {
  let component: JetCourseComponent;
  let fixture: ComponentFixture<JetCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JetCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JetCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
