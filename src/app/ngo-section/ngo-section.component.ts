import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-ngo-section',
  imports: [CommonModule,RouterModule,TranslateModule],
  templateUrl: './ngo-section.component.html',
  styleUrl: './ngo-section.component.scss'
})
export class NgoSectionComponent {

}
