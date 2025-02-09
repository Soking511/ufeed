import { Component } from '@angular/core';
import {FormControl,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ngo',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './ngo.component.html',
  styleUrl: './ngo.component.scss'
})
export class NgoComponent {

  contactNgo:FormGroup = new FormGroup({
    'fullname': new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._\s]{3,20}$/) // Allows spaces
    ]),
    'ngoName':new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._\s]{3,20}$/) // Allows spaces
    ]),'ngoWebsite':new FormControl(null,[
      Validators.required, 
      Validators.pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)
    ]),
    'title':new FormControl(null, [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._\s]{3,20}$/) 
    ]),
    'email': new FormControl(null, [Validators.required, Validators.email
    ]),
    'mobile': new FormControl(null,[Validators.required, 
      Validators.pattern(/^(?:\+?\d{1,4}[\s-]?)?(?:\(?\d{1,4}\)?[\s-]?)?\d{7,10}$/
  )]),
  'headcount': new FormControl(null,[
    Validators.required,
    Validators.min(2),
    Validators.max(120)
  ]),'positions': new FormControl(null,[
    Validators.required,
    Validators.min(2),
    Validators.max(120)
  ]),
  })

  
  getFormData(contactNgo:object){
    console.log(contactNgo);
    }

}
