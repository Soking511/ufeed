import { Component, Output, EventEmitter, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-subscription-popup',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './subscription-popup.component.html',
  styleUrls: ['./subscription-popup.component.scss'],
})
export class SubscriptionPopupComponent {
  @Output() closePopup = new EventEmitter<void>();
  @Input() feature: string = 'webinar'; // Deprecated: kept for backward compatibility

  currentLang: string;

  constructor(private translateService: TranslateService) {
    // Get the current language from the translation service
    this.currentLang = this.translateService.currentLang || 'en'; // default to 'en' if not defined
  }
  isVisible = false;
  submitted = false;
  isSubmitting = false;
  isLoadingFeature = false;
  autoCloseTimer = 5;
  submitError: string = '';
  activeFeature: any = null; // Stores the currently active feature from backend
  featureLoadError: string = '';

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
    this.loadActiveFeature();
  }

  loadActiveFeature() {
    this.isLoadingFeature = true;
    this.featureLoadError = '';

    this.apiService.getActiveFeature().subscribe({
      next: (feature) => {
        this.activeFeature = feature;
        this.isLoadingFeature = false;

        // Adjust LinkedIn validators based on feature settings
        const linkedinControl = this.registrationForm.get('linkedinProfile');
        if (linkedinControl) {
          if (this.activeFeature.requires_linkedin) {
            linkedinControl.setValidators([
              Validators.required,
              Validators.pattern(/^(https?:\/\/)?(www\.)?linkedin\.com\/.+$/i),
            ]);
          } else {
            linkedinControl.clearValidators();
          }
          linkedinControl.updateValueAndValidity({ emitEvent: false });
        }
      },
      error: (error) => {
        this.isLoadingFeature = false;
        console.error('Failed to load active feature:', error);

        if (error.status === 404) {
          // No active feature - close the popup as fallback
          console.log('No active feature available, closing popup');
          this.close();
        } else {
          this.featureLoadError = 'subscription.popup.failed';
        }
      }
    });
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
        feature: this.activeFeature?.feature_type || this.feature, // Use active feature type or fallback
        full_name: this.registrationForm.value.fullName,
        phone_number: this.registrationForm.value.phoneNumber,
        email: this.registrationForm.value.email,
        company_name: this.registrationForm.value.companyName,
        job_position: this.registrationForm.value.jobPosition,
        additional_info: {
          source: 'website_popup',
          feature_name: this.activeFeature?.name,
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          ...(this.activeFeature?.requires_linkedin && this.registrationForm.value.linkedinProfile
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
              this.submitError = 'subscription.popup.submit_error';
            }
          } else {
            this.submitError = 'subscription.popup.submit_error2';
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
