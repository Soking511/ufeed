import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { PartnerReferenceComponent } from "../../shared/components/partner-reference/partner-reference.component";


@Component({
  selector: 'app-jet-course',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, PartnerReferenceComponent],
  templateUrl: './jet-course.component.html',
  styleUrl: './jet-course.component.scss'
})
export class JetCourseComponent {


// form data
courseForm:FormGroup= new FormGroup({
  username:new FormControl(null, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
    Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._\s]{3,20}$/) // Allows spaces
  ]),
  contactNumber:new FormControl(null, [
    Validators.required,
    Validators.pattern(/^(?:\+?\d{1,4}[\s-]?)?(?:\(?\d{1,4}\)?[\s-]?)?\d{7,10}$/)
  ]),
  email: new FormControl(null, [Validators.required, Validators.email]),
  companyName: new FormControl(null, [ Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
    Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._]{3,20}$/)
  ])

});


// ---------

getFormData(courseForm:object){
  console.log(courseForm);
  }

}
