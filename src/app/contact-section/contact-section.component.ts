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
    
    'title': new FormControl(''),
  
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'company': new FormControl(''),
    'inquiry':new FormControl('null', [Validators.required]),
    'product':new FormControl('null', [Validators.required]),
    'message': new FormControl(''),
  
  });
  
  
  getFormData(contactForm:object){
  console.log(contactForm);
  }



}
