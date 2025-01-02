import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {FormControl,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';

@Component({
  selector: 'app-contact-section',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss'
})
export class ContactSectionComponent {

  // ---------------------------
  // form inputs 
  
  contactForm:FormGroup = new FormGroup({
    'fullname': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20), // Maximum 15 characters
      Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._]{3,20}$/) ]),
  
    'phone': new FormControl(null, [Validators.required, 
      Validators.pattern(/^(?:\+?\d{1,4}[\s-]?)?(?:\(?\d{1,4}\)?[\s-]?)?\d{7,10}$/
  )]),
    
      'title': new FormControl(''),
  
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'company': new FormControl(''),
    'message': new FormControl(''),
  
  });
  
  
  getFormData(contactForm:object){
  console.log(contactForm);
  }



}
