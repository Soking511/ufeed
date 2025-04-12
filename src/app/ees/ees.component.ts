import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-ees',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './ees.component.html',
  styleUrl: './ees.component.scss',
})
export class EesComponent {
  constructor(private api: ApiService) {}

  hoveredIndex: number | null = null;

  onMouseOver(index: number) {
    this.hoveredIndex = index; // Highlight the hovered row
  }

  onMouseOut() {
    this.hoveredIndex = null; // Reset the hover effect
  }

  // ----------
  // form data

  eesForm: FormGroup = new FormGroup({
    number_of_departments: new FormControl(null, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(3),
    ]),

    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._\s]{3,20}$/), // Allows spaces
    ]),
    number: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?:\+?\d{1,4}[\s-]?)?(?:\(?\d{1,4}\)?[\s-]?)?\d{7,10}$/
      ),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    company_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._]{3,20}$/),
    ]),
    product: new FormControl('null', [Validators.required]),
  });

  onlyNumberKey(event: KeyboardEvent): boolean {
    // Only allow numbers (0-9)
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getFormData(eesForm: any) {
    console.log(eesForm.value);
    this.api.post('ees-tool', eesForm.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Request completed');
      },
    });
  }
}
