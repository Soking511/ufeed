import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
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
  selector: 'app-contact-section',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    ConfirmationPageComponent,
  ],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
})
export class ContactSectionComponent implements AfterViewChecked {
  submitted = false;
  disabled = false;
  contactForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      // Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._\s]{3,20}$/), // Allows spaces
    ]),

    phone_number: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?:\+?\d{1,4}[\s-]?)?(?:\(?\d{1,4}\)?[\s-]?)?\d{7,10}$/
      ),
    ]),

    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    company_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    inquiry_type: new FormControl(null, [Validators.required]),
    product: new FormControl(null, [Validators.required]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
  });

  @ViewChild('confirmationPage') confirmationPage: ElementRef | undefined;
  private scrollToConfirmation = false;

  constructor(private apiService: ApiService) {}
  getFormData(contactForm: any) {
    this.disabled = true;
    console.log(contactForm.value);
    this.apiService.post('contact', contactForm.value).subscribe({
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

  ngAfterViewChecked() {
    if (this.submitted && this.scrollToConfirmation && this.confirmationPage) {
      const element = document.getElementById('confirmationSection');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.scrollToConfirmation = false; // Prevent multiple scrolls
      }
    }
  }

  products = [
    { value: 'JET', label: 'Job Evaluation Tool - JET' },
    { value: 'EES', label: 'Employee Engagement Survey - EES' },
    // { value: 'Both', label: 'Both' },
  ];

  inquiries = [
    { value: 'book a demo', label: 'Book a Demo' },
    { value: 'get a quotation', label: 'Get a Quotation' },
    { value: 'have an inquiry', label: 'Have an Inquiry' },
  ];

  onProductSelectionChange(event: any, value: string): void {
    const productFormControl = this.contactForm.get('product');
    const selectedProducts = productFormControl?.value || [];

    if (event.target.checked) {
      // Add the value if checked
      productFormControl?.setValue([...selectedProducts, value]);
    } else {
      // Remove the value if unchecked
      productFormControl?.setValue(
        selectedProducts.filter((item: string) => item !== value)
      );
    }
  }

  // Method to check if a product is selected
  isProductSelected(value: string): boolean {
    const selectedProducts = this.contactForm.get('product')?.value || [];
    return selectedProducts.includes(value);
  }

  onInquirySelectionChange(event: any, value: string): void {
    const inquiryFormControl = this.contactForm.get('inquiry_type');
    const selectedInquiries = inquiryFormControl?.value || [];

    if (event.target.checked) {
      inquiryFormControl?.setValue([...selectedInquiries, value]);
    } else {
      inquiryFormControl?.setValue(
        selectedInquiries.filter((item: string) => item !== value)
      );
    }
  }

  isInquirySelected(value: string): boolean {
    const selectedInquiries = this.contactForm.get('inquiry_type')?.value || [];
    return selectedInquiries.includes(value);
  }
  isValidInput(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    if (control) {
      return control.invalid && (control.dirty || control.touched);
    }
    return false;
  }

  isInputValid(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    if (control) {
      return control.valid;
    }
    return false;
  }
}
