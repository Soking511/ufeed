import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';

import {FormControl,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-jet',
  imports: [CommonModule,ReactiveFormsModule,TranslateModule],
  templateUrl: './jet.component.html',
  styleUrl: './jet.component.scss'
})
export class JetComponent {

  constructor(private api:ApiService) { }
// form data
jetForm:FormGroup= new FormGroup({
  username:new FormControl(null, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
    Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._\s]{3,20}$/) // Allows spaces
  ]),
  title:new FormControl(null, [
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

})


// hover elements
  hoveredIndex: number | null = null;

  onMouseOver(index: number) {
    this.hoveredIndex = index; // Highlight the hovered row
  }

  onMouseOut() {
    this.hoveredIndex = null; // Reset the hover effect
  }


// ---------


getFormData(jetForm:object){
  this.api.postFormData(jetForm,'jet-tool');
  }


}
