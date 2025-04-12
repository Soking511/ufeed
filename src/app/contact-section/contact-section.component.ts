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
import { InputComponent } from "../shared/components/input/input.component";

@Component({
  selector: 'app-contact-section',
  imports: [ReactiveFormsModule, CommonModule, TranslateModule, InputComponent],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
})
export class ContactSectionComponent {
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

    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    company_name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    inquiry: new FormControl('null', [Validators.required]),
    product: new FormControl('null', [Validators.required]),
    message: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  });

  constructor(private apiService: ApiService) {}
  getFormData(contactForm: any) {
    this.apiService.post('contact', contactForm.value ).subscribe({
      next: (res) => {
        // console.log(res);
      },
      error: (err) => {
        // console.error('Error submitting form:', err);
      },
      complete: () => {
        // console.log('Request completed');
      },
    });
  }

  products = [
    { value: 'JET', label: 'Job Evaluation Tool - JET' },
    { value: 'EES', label: 'Employee Engagement Survey - EES' },
  ];

  inquiries = [
    { value: 'book a demo', label: 'Book a Demo' },
    { value: 'get a quotation', label: 'Get a Quotation' },
    { value: 'have an inquiry', label: 'Have an Inquiry' },
  ];

}
