import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';
import { ConfirmationPageComponent } from '../confirmation-page/confirmation-page.component';

@Component({
  selector: 'app-ees',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    ConfirmationPageComponent,
  ],
  templateUrl: './ees.component.html',
  styleUrl: './ees.component.scss',
})
export class EesComponent implements AfterViewChecked {
  submitted = false;
  disabled = false;
  @ViewChild('confirmationPage') confirmationPage: ElementRef | undefined;
  private scrollToConfirmation = false;

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

    number_of_employees: new FormControl(null, [
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
    product: new FormControl("EES", [Validators.required]),
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
    if ( this.eesForm.valid) {
      this.disabled = true;
      this.api.post('ees-tool', eesForm.value).subscribe({
        next: (res) => {
          this.submitted = true;
          this.scrollToConfirmation = true;
        },
        error: (err) => {
          this.disabled = false;
        },
        complete: () => {
          this.disabled = false;
        },
      });
    }
    else {
      this.eesForm.markAllAsTouched();
    }
  }

  ngAfterViewChecked() {
    if (this.submitted && this.scrollToConfirmation && this.confirmationPage) {
      const element = document.getElementById('confirmationSection');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.scrollToConfirmation = false;
      }
    }
  }

  isValidInput(controlName: string): boolean {
    const control = this.eesForm.get(controlName);
    if (control) {
      return control.invalid && (control.dirty || control.touched);
    }
    return false;
  }

  isInputValid(controlName: string): boolean {
    const control = this.eesForm.get(controlName);
    if (control) {
      return control.valid && (control.dirty || control.touched);
    }
    return false;
  }
}
