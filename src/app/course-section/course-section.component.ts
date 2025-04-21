import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { PartnerReferenceComponent } from "../../shared/components/partner-reference/partner-reference.component";

@Component({
  selector: 'app-course-section',
  imports: [CommonModule, RouterModule, TranslateModule, PartnerReferenceComponent],
  templateUrl: './course-section.component.html',
  styleUrl: './course-section.component.scss'
})
export class CourseSectionComponent {





}
