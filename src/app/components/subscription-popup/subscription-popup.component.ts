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
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?:\+?\d{1,4}[\s-]?)?(?:\(?\d{1,4}\)?[\s-]?)?\d{7,10}$/
      ),
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
        if (controlName === 'phone') {
          return 'Please enter a valid phone number';
        }
        return 'Please enter a valid value';
      }
    }
    return '';
  }
}
