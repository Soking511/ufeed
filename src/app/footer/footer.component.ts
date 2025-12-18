import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { PartnerReferenceComponent } from "../../shared/components/partner-reference/partner-reference.component";
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-footer',
  imports: [RouterLink, RouterModule, TranslateModule, PartnerReferenceComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}


@Pipe({ name: 'toLatinDigits' })
export class ToLatinDigitsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    const arabicDigits = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    return value
      .replace(/[٠-٩]/g, d => arabicDigits.indexOf(d).toString())
      .replace(/\s/g, '\u200E'); // LTR mark for spaces
  }
}

