import { Component } from '@angular/core';
import { ClientsComponent } from '../clients/clients.component';
import { RouterLink, RouterModule } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { PartnerReferenceComponent } from "../../shared/components/partner-reference/partner-reference.component";

@Component({
  selector: 'app-about',
  imports: [ClientsComponent, TranslateModule, RouterLink, RouterModule, PartnerReferenceComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
