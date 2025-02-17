import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-become-partner',
  imports: [RouterLink,RouterLinkActive,RouterModule,TranslateModule],
  templateUrl: './become-partner.component.html',
  styleUrl: './become-partner.component.scss'
})
export class BecomePartnerComponent {

}
