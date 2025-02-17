import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-course-section',
  imports: [CommonModule,RouterModule,TranslateModule],
  templateUrl: './course-section.component.html',
  styleUrl: './course-section.component.scss'
})
export class CourseSectionComponent {


  


}
