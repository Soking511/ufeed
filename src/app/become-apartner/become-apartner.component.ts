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
  selector: 'app-become-apartner',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    ConfirmationPageComponent,
  ],
  templateUrl: './become-apartner.component.html',
  styleUrls: ['./become-apartner.component.scss'],
})
export class BecomeAPartnerComponent implements AfterViewChecked {
  submitted = false;
  disabled = false;
  isOtherSelected: boolean = false;
  @ViewChild('confirmationPage') confirmationPage: ElementRef | undefined;
  private scrollToConfirmation = false;

  becomePartner: FormGroup = new FormGroup({
    company_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._]{3,20}$/),
    ]),
    company_address: new FormControl(null, Validators.required),
    company_website: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}.*$/),
    ]),
    company_number: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?:\+?\d{1,4}[\s-]?)?(?:\(?\d{1,4}\)?[\s-]?)?\d{7,10}$/
      ),
    ]),
    address: new FormControl(null, Validators.required),
    partner_type: new FormControl(null, Validators.required),
    OtherPartnerType: new FormControl(''), // Additional input field for 'Other'
    country_interested: new FormControl(null, Validators.required),
    company_profile: new FormControl(Validators.required),
    contact_person: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._]{3,20}$/),
    ]),
    title: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    mobile_number: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?:\+?\d{1,4}[\s-]?)?(?:\(?\d{1,4}\)?[\s-]?)?\d{7,10}$/
      ),
    ]),
    message: new FormControl(),
  });

  selectedFile: File | null = null;

  // Inject HttpClient
  constructor(private api: ApiService) {}

  // Function to handle selection change
  onPartnerTypeChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.isOtherSelected = selectedValue === 'Other';

    if (this.isOtherSelected) {
      this.becomePartner
        .get('OtherPartnerType')
        ?.setValidators([Validators.required]);
    } else {
      this.becomePartner.get('OtherPartnerType')?.clearValidators();
      this.becomePartner.get('OtherPartnerType')?.setValue('');
    }
    this.becomePartner.get('OtherPartnerType')?.updateValueAndValidity();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];

      this.becomePartner.patchValue({
        company_profile: this.selectedFile,
      });
    }
  }

  removeFile(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    const fileInfo = (event.target as HTMLElement).closest('.file-info');
    if (fileInfo) {
      fileInfo.classList.add('fade-out');

      setTimeout(() => {
        this.selectedFile = null;

        this.becomePartner.patchValue({
          company_profile: null,
        });

        const fileInput = document.getElementById(
          'fileInput'
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      }, 300);
    } else {
      this.selectedFile = null;
      this.becomePartner.patchValue({
        company_profile: null,
      });
      const fileInput = document.getElementById(
        'fileInput'
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
  }

  getFileIconClass(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase();

    if (extension === 'pdf') {
      return 'fa-file-pdf';
    } else if (['doc', 'docx'].includes(extension || '')) {
      return 'fa-file-word';
    } else {
      return 'fa-file';
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  onSubmit() {
    if (this.becomePartner.valid) {
      const formData = new FormData();

      Object.keys(this.becomePartner.value).forEach((key) => {
        if (
          key !== 'company_profile' &&
          this.becomePartner.value[key] !== null
        ) {
          formData.append(key, this.becomePartner.value[key]);
        }
      });

      if (this.selectedFile) {
        formData.append('company_profile', this.selectedFile);
      }

      this.disabled = true;
      // Send data to API
      this.api.postFormData('become-partner', formData).subscribe({
        next: () => {
          this.becomePartner.reset();
          this.selectedFile = null;
          this.submitted = true;
          this.scrollToConfirmation = true;
        },
        error: () => {},
        complete: () => {
          this.disabled = false;
        }
      });
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
}
