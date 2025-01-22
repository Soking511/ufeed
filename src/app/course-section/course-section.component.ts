import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JetCourseComponent } from '../jet-course/jet-course.component';

@Component({
  selector: 'app-course-section',
  imports: [CommonModule,RouterModule,JetCourseComponent],
  templateUrl: './course-section.component.html',
  styleUrl: './course-section.component.scss'
})
export class CourseSectionComponent {

}
