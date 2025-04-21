import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-partner-reference',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './partner-reference.component.html',
  styleUrl: './partner-reference.component.scss'
})
export class PartnerReferenceComponent {
  @Input() text = 'JOBMASTER';
}
