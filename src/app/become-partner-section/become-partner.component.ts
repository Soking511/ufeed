import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { PartnerReferenceComponent } from "../../shared/components/partner-reference/partner-reference.component";

@Component({
  selector: 'app-become-partner',
  imports: [RouterLink, RouterLinkActive, RouterModule, TranslateModule, PartnerReferenceComponent],
  templateUrl: './become-partner.component.html',
  styleUrl: './become-partner.component.scss'
})
export class BecomePartnerComponent {

}
