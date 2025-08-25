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
  currentStep: 'welcome' | 'registration' | 'success' = 'welcome';

  // Updated form structure to match the new design
  subscriptionForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    number: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\d\s\-\+\(\)]+$/), // Allow digits, spaces, hyphens, plus, parentheses
      Validators.minLength(7),
      Validators.maxLength(15),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    company: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
  });

  constructor(private apiService: ApiService) {}

  openPopup() {
    this.isVisible = true;
    this.currentStep = 'welcome';
    this.subscriptionForm.reset();
  }

  close() {
    this.isVisible = false;
    this.currentStep = 'welcome';
    this.closePopup.emit();
  }

  setCurrentStep(step: 'welcome' | 'registration' | 'success') {
    this.currentStep = step;
  }

  onSubmit() {
    if (this.subscriptionForm.valid) {
      this.isSubmitting = true;

      // Use the same API endpoint and data structure
      this.apiService
        .post('course-inquiry', this.subscriptionForm.value)
        .subscribe({
          next: (res) => {
            this.isSubmitting = false;
            this.currentStep = 'success';

            // Auto-close after 5 seconds
            setTimeout(() => {
              this.close();
            }, 5000);
          },
          error: (err) => {
            this.isSubmitting = false;
            // Handle validation errors from API response
            this.handleApiValidationErrors(err);
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

  private handleApiValidationErrors(error: any) {
    if (error.error && typeof error.error === 'object') {
      // Handle validation errors in the format: { "fieldName": ["error message"] }
      Object.keys(error.error).forEach((fieldName) => {
        // Map API field names to form field names
        let formFieldName = fieldName;

        // Map common API field names to form field names
        if (fieldName === 'number' || fieldName === 'phone_number') {
          formFieldName = 'phone';
        } else if (fieldName === 'full_name' || fieldName === 'name') {
          formFieldName = 'name';
        } else if (fieldName === 'job_title' || fieldName === 'title') {
          formFieldName = 'title';
        } else if (fieldName === 'email_address' || fieldName === 'email') {
          formFieldName = 'email';
        } else if (fieldName === 'company_name' || fieldName === 'company') {
          formFieldName = 'company';
        }

        const field = this.subscriptionForm.get(formFieldName);
        if (field && Array.isArray(error.error[fieldName])) {
          // Set custom validation error
          field.setErrors({
            apiError: error.error[fieldName][0] || 'Validation failed',
          });
          field.markAsTouched();
        }
      });
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
      // Check for API validation errors first
      if (control.errors['apiError']) {
        return control.errors['apiError'];
      }

      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (control.errors['minlength']) {
        if (controlName === 'phone') {
          return `Phone number must be at least ${control.errors['minlength'].requiredLength} characters`;
        }
        return `Minimum length is ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['maxlength']) {
        if (controlName === 'phone') {
          return `Phone number must not exceed ${control.errors['maxlength'].requiredLength} characters`;
        }
        return `Maximum length is ${control.errors['maxlength'].requiredLength} characters`;
      }
      if (control.errors['pattern']) {
        if (controlName === 'phone') {
          return 'Please enter a valid phone number (digits, spaces, hyphens, +, parentheses only)';
        }
        return 'Please enter a valid value';
      }
    }
    return '';
  }
}
