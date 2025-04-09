import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contact-section',
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
})
export class ContactSectionComponent {
  // ---------------------------
  // form inputs

  contactForm: FormGroup = new FormGroup({
    fullname: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._\s]{3,20}$/), // Allows spaces
    ]),

    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?:\+?\d{1,4}[\s-]?)?(?:\(?\d{1,4}\)?[\s-]?)?\d{7,10}$/
      ),
    ]),

    title: new FormControl(''),

    email: new FormControl(null, [Validators.required, Validators.email]),
    company: new FormControl(''),
    inquiry: new FormControl('null', [Validators.required]),
    product: new FormControl('null', [Validators.required]),
    message: new FormControl(''),
  });

  constructor(private apiService:ApiService){

  }
  getFormData(contactForm: object) {
    console.log(contactForm)
    this.apiService.postFormData(contactForm, 'contact');
  }

  products = [
    { value: 'JET', label: 'Job Evaluation Tool - JET' },
    { value: 'EES', label: 'Employee Engagement Survey - EES' },
  ];

  onCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    let selectedProducts = this.contactForm.get('product')?.value || [];

    if (target.checked) {
      selectedProducts.push(target.value);
      this.contactForm.get('product')?.setValue(target.value);
    } else {
      selectedProducts = selectedProducts.filter(
        (p: string) => p !== target.value
      );
    }

  }

  inquiries = [
    { value: 'book a demo', label: 'Book a Demo' },
    { value: 'get a quotation', label: 'Get a Quotation' },
    { value: 'have an inquiry', label: 'Have an Inquiry' },
  ];

  onInquiryCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    let selectedInquiries = this.contactForm.get('inquiry')?.value || [];

    if (target.checked) {
      selectedInquiries.push(target.value);
    } else {
      selectedInquiries = selectedInquiries.filter(
        (i: string) => i !== target.value
      );
    }

    this.contactForm.get('inquiry')?.setValue(selectedInquiries);
  }
}
