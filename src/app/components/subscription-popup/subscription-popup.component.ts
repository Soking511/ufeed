import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-subscription-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './subscription-popup.component.html',
  styleUrls: ['./subscription-popup.component.scss'],
})
export class SubscriptionPopupComponent {
  @Output() closePopup = new EventEmitter<void>();
  isVisible = false;
  isSubmitting = false;
  submitted = false;
  isWelcomePopup = false;

  // Updated to match jet-course.component.ts form structure exactly
  subscriptionForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._\s]{3,20}$/),
    ]),
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    number: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?:\+?\d{1,4}[\s-]?)?(?:\(?\d{1,4}\)?[\s-]?)?\d{7,10}$/
      ),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    company_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._]{3,20}$/),
    ]),
  });

  constructor(private apiService: ApiService) {}

  openPopup(popupType: 'welcome' | 'subscription' = 'subscription') {
    this.isWelcomePopup = popupType === 'welcome';
    this.isVisible = true;
    this.submitted = false;
    this.subscriptionForm.reset(); // Reset form on open
  }

  close() {
    this.isVisible = false;
    this.closePopup.emit();
  }

  onSubmit() {
    if (this.subscriptionForm.valid) {
      this.isSubmitting = true;

      // Use the same API endpoint and data structure as jet-course.component.ts
      this.apiService
        .post('course-inquiry', this.subscriptionForm.value)
        .subscribe({
          next: (res) => {
            this.isSubmitting = false;
            this.submitted = true;

            // Auto-close after 3 seconds
            setTimeout(() => {
              this.close();
            }, 3000);
          },
          error: (err) => {
            this.isSubmitting = false;
            // Handle error if needed
            console.error('Subscription submission error:', err);
          },
          complete: () => {
            this.isSubmitting = false;
          },
        });
    } else {
      this.subscriptionForm.markAllAsTouched();
    }
  }

  isInputValid(controlName: string): boolean {
    const control = this.subscriptionForm.get(controlName);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.subscriptionForm.get(controlName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (control.errors['minlength']) {
        return `Minimum length is ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['maxlength']) {
        return `Maximum length is ${control.errors['maxlength'].requiredLength} characters`;
      }
      if (control.errors['pattern']) {
        if (controlName === 'number') {
          return 'Please enter a valid phone number';
        }
        return 'Please enter a valid value';
      }
    }
    return '';
  }
}
