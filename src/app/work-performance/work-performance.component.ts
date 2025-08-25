import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-work-performance',
  imports: [CommonModule,TranslateModule],
  templateUrl: './work-performance.component.html',
  styleUrl: './work-performance.component.scss'
}) 

export class WorkPerformanceComponent {

}
