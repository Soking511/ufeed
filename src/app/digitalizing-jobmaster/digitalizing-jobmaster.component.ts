import { Component } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { PartnerReferenceComponent } from "../../shared/components/partner-reference/partner-reference.component";

@Component({
  selector: 'app-digitalizing-jobmaster',
  imports: [TranslateModule, PartnerReferenceComponent],
  templateUrl: './digitalizing-jobmaster.component.html',
  styleUrl: './digitalizing-jobmaster.component.scss'
})
export class DigitalizingJOBMASTerComponent {

}
