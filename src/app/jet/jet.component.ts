import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';

import {FormControl,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { InputComponent } from "../shared/components/input/input.component";

@Component({
  selector: 'app-jet',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, InputComponent],
  templateUrl: './jet.component.html',
  styleUrl: './jet.component.scss'
})
export class JetComponent {

  constructor(private api:ApiService) { }
// form data
jetForm:FormGroup= new FormGroup({
  number_of_departments: new FormControl(null, [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(3),
  ]),

  name: new FormControl(null, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
    Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._\s]{3,20}$/), // Allows spaces
  ]),
  title: new FormControl(null, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
    Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._\s]{3,20}$/), // Allows spaces
  ]),
  number: new FormControl(null, [
    Validators.required,
    Validators.pattern(
      /^(?:\+?\d{1,4}[\s-]?)?(?:\(?\d{1,4}\)?[\s-]?)?\d{7,10}$/
    ),
  ]),
  email: new FormControl(null, [Validators.required, Validators.email]),
  company_name: new FormControl(null, [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
    Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._]{3,20}$/),
  ]),
  product: new FormControl('null', [Validators.required]),
});


// hover elements
  hoveredIndex: number | null = null;

  onMouseOver(index: number) {
    this.hoveredIndex = index; // Highlight the hovered row
  }

  onMouseOut() {
    this.hoveredIndex = null; // Reset the hover effect
  }


// ---------


getFormData(jetForm:any){
  this.api.post('jet-tool', jetForm.value).subscribe({
    next: (res) => {
      console.log(res);
    },
    error: (err) => {
      console.error(err);
    },
    complete: () => {
      console.log('Request completed');
    },
  });
}


}
