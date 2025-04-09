import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormControl,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-section',
  imports: [ReactiveFormsModule,CommonModule,TranslateModule],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss'
})
export class ContactSectionComponent {

  // ---------------------------
  // form inputs 
  
  contactForm:FormGroup = new FormGroup({
  'fullname': new FormControl(null, [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(20),
  Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._\s]{3,20}$/) // Allows spaces
]),

    'phone': new FormControl(null, [Validators.required, 
      Validators.pattern(/^(?:\+?\d{1,4}[\s-]?)?(?:\(?\d{1,4}\)?[\s-]?)?\d{7,10}$/
  )]),
    
    'title': new FormControl(null, [Validators.required]),
  
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'company': new FormControl(null, [Validators.required]),
    'inquiry':new FormControl('null', [Validators.required]),
    'product':new FormControl('null', [Validators.required]),
    'message': new FormControl(null, [Validators.required]),
  
  });
  
  
  getFormData(contactForm:object){
  console.log(contactForm);
  }

  products = [
    { value: 'jet', label: 'Job Evaluation Tool - JET' },
    { value: 'ees', label: 'Employee Engagement Survey - EES' }
  ];
  
  onCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    let selectedProducts = this.contactForm.get('product')?.value || [];
  
    if (target.checked) {
      selectedProducts.push(target.value);
    } else {
      selectedProducts = selectedProducts.filter((p: string) => p !== target.value);
    }
  
    this.contactForm.get('product')?.setValue(selectedProducts);
  }
  
  inquiries = [
    { value: 'book-demo', label: 'Book a Demo' },
    { value: 'get-quotation', label: 'Get a Quotation' },
    { value: 'have-inquiry', label: 'Have an Inquiry' }
  ];
  
  onInquiryCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    let selectedInquiries = this.contactForm.get('inquiry')?.value || [];
  
    if (target.checked) {
      selectedInquiries.push(target.value);
    } else {
      selectedInquiries = selectedInquiries.filter((i: string) => i !== target.value);
    }
  
    this.contactForm.get('inquiry')?.setValue(selectedInquiries);
  }
  

}
