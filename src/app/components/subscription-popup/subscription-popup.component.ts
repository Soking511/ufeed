import { Component, Output, EventEmitter, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-subscription-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './subscription-popup.component.html',
  styleUrls: ['./subscription-popup.component.scss'],
})
export class SubscriptionPopupComponent {
  @Output() closePopup = new EventEmitter<void>();
  @Input() feature: string = 'national-initiative'; // Feature identifier from parent component
  
  isVisible = false;
  submitted = false;
  isSubmitting = false;
  autoCloseTimer = 5;
  submitError: string = '';

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private apiService = inject(ApiService);
  countdownInterval: any;

  registrationForm = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
    email: ['', [Validators.required, Validators.email]],
    companyName: ['', [Validators.required, Validators.minLength(2)]],
    jobPosition: ['', [Validators.required, Validators.minLength(2)]],
    linkedinProfile: [''],
  });

  get fullName() {
    return this.registrationForm.get('fullName')!;
  }

  get phoneNumber() {
    return this.registrationForm.get('phoneNumber')!;
  }

  get email() {
    return this.registrationForm.get('email')!;
  }

  get companyName() {
    return this.registrationForm.get('companyName')!;
  }

  get jobPosition() {
    return this.registrationForm.get('jobPosition')!;
  }

  get linkedinProfile() {
    return this.registrationForm.get('linkedinProfile')!;
  }

  openPopup() {
    this.isVisible = true;
    // Adjust validators for webinar feature
    const linkedinControl = this.registrationForm.get('linkedinProfile');
    if (linkedinControl) {
      if (this.feature === 'webinar') {
        linkedinControl.setValidators([
          Validators.required,
          Validators.pattern(/^(https?:\/\/)?(www\.)?linkedin\.com\/.+$/i),
        ]);
      } else {
        linkedinControl.clearValidators();
      }
      linkedinControl.updateValueAndValidity({ emitEvent: false });
    }
  }

  close() {
    this.isVisible = false;
    this.submitted = false;
    this.isSubmitting = false;
    this.autoCloseTimer = 5;
    this.registrationForm.reset();
    this.closePopup.emit();
    
    // Clear countdown interval if exists
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.isSubmitting = true;
      this.submitError = '';
      
      // Prepare data in the format expected by backend
      const formData = {
        feature: this.feature,
        full_name: this.registrationForm.value.fullName,
        phone_number: this.registrationForm.value.phoneNumber,
        email: this.registrationForm.value.email,
        company_name: this.registrationForm.value.companyName,
        job_position: this.registrationForm.value.jobPosition,
        additional_info: {
          source: 'website_popup',
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          ...(this.feature === 'webinar' && this.registrationForm.value.linkedinProfile
            ? { linkedin_profile: this.registrationForm.value.linkedinProfile }
            : {}),
        }
      };
      
      // Submit to backend API
      this.apiService.post('feature-registration', formData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submitted = true;
          console.log('Registration successful:', response);
          
          // Start countdown timer
          this.startAutoCloseCountdown();
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Registration failed:', error);
          
          // Handle specific error messages
          if (error.error) {
            if (typeof error.error === 'string') {
              this.submitError = error.error;
            } else if (error.error.email) {
              this.submitError = Array.isArray(error.error.email) 
                ? error.error.email[0] 
                : error.error.email;
            } else if (error.error.detail) {
              this.submitError = error.error.detail;
            } else {
              this.submitError = 'Registration failed. Please try again.';
            }
          } else {
            this.submitError = 'Network error. Please check your connection and try again.';
          }
          
          // Mark all fields as touched to show validation errors
          this.registrationForm.markAllAsTouched();
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.registrationForm.markAllAsTouched();
    }
  }

  startAutoCloseCountdown() {
    this.autoCloseTimer = 5;
    this.countdownInterval = setInterval(() => {
      this.autoCloseTimer--;
      if (this.autoCloseTimer <= 0) {
        clearInterval(this.countdownInterval);
        this.close();
      }
    }, 1000);
  }

  cancelAutoClose() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }
}
