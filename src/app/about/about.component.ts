import { Component } from '@angular/core';
import { ClientsComponent } from '../clients/clients.component';
import { CommonModule } from '@angular/common';

import { RouterLink, RouterModule } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PartnerReferenceComponent } from "../../shared/components/partner-reference/partner-reference.component";

@Component({
  selector: 'app-about',
  imports: [ClientsComponent, CommonModule, TranslateModule, RouterLink, RouterModule, PartnerReferenceComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  currentLang: string;

  constructor(public translate: TranslateService) {
    this.currentLang = this.translate.currentLang || 'en'; // default to 'en' if not defined

  }


}
