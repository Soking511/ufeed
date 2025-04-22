import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ConfirmationPageComponent } from '../confirmation-page/confirmation-page.component';
import { PartnerReferenceComponent } from "../../shared/components/partner-reference/partner-reference.component";

@Component({
  selector: 'app-jet',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    ConfirmationPageComponent,
    PartnerReferenceComponent
],
  templateUrl: './jet.component.html',
  styleUrl: './jet.component.scss',
})
export class JetComponent implements AfterViewChecked {
  submitted = false;
  disabled = false;
  @ViewChild('confirmationPage') confirmationPage: ElementRef | undefined;
  private scrollToConfirmation = false;

  constructor(private api: ApiService) {}

  // form data
  jetForm: FormGroup = new FormGroup({
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
      Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._\s]{3,20}$/), // Allows spaces
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
    product: new FormControl('JET', [Validators.required]),
  });

  // hover elements
  hoveredIndex: number | null = null;

  onMouseOver(index: number) {
    this.hoveredIndex = index; // Highlight the hovered row
  }

  onMouseOut() {
    this.hoveredIndex = null; // Reset the hover effect
  }

  // ---------

  getFormData(jetForm: any) {
    if ( this.jetForm.valid) {
      this.disabled=true;
      this.api.post('jet-tool', jetForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.scrollToConfirmation = true;
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.log('Request completed');
          this.disabled=false;
        },
      });
    } else {
      this.jetForm.markAllAsTouched();
    }
  }

  ngAfterViewChecked() {
    if (this.submitted && this.scrollToConfirmation && this.confirmationPage) {
      const element = document.getElementById('confirmationSection');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.scrollToConfirmation = false; // Prevent multiple scrolls
      }
    }
  }

  isValidInput(controlName: string): boolean {
    const control = this.jetForm.get(controlName);
    if (control) {
      return control.invalid && (control.dirty || control.touched);
    }
    return false;
  }

  isInputValid(controlName: string): boolean {
    const control = this.jetForm.get(controlName);
    if (control) {
      return control.valid ;
    }
    return false;
  }
}
