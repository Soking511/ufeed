import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PartnerReferenceComponent } from '../../shared/components/partner-reference/partner-reference.component';
import { ApiService } from '../services/api.service';
import { ConfirmationPageComponent } from "../confirmation-page/confirmation-page.component";

@Component({
  selector: 'app-jet-course',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    PartnerReferenceComponent,
    ConfirmationPageComponent
],
  templateUrl: './jet-course.component.html',
  styleUrl: './jet-course.component.scss',
})
export class JetCourseComponent {
  constructor(private apiService: ApiService) {}
  submitted = false;
  disabled = false;
  scrollToConfirmation = false;
  @ViewChild('confirmationPage') confirmationPage: ElementRef | undefined;

  // form data
  courseForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
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
  });

  // ---------

  ngAfterViewChecked() {
    if (this.submitted && this.scrollToConfirmation && this.confirmationPage) {
      const element = document.getElementById('confirmationSection');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.scrollToConfirmation = false; // Prevent multiple scrolls
      }
    }
  }

  getFormData(contactForm: any) {
    if (this.courseForm.valid) {
      this.disabled = true;
      this.apiService.post('course-inquiry', contactForm.value).subscribe({
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
    } else {
      this.courseForm.markAllAsTouched();
    }
  }
}
