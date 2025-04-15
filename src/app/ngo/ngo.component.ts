import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';
import { ConfirmationPageComponent } from "../confirmation-page/confirmation-page.component";

@Component({
  selector: 'app-ngo',
  imports: [ReactiveFormsModule, CommonModule, TranslateModule, ConfirmationPageComponent],
  templateUrl: './ngo.component.html',
  styleUrl: './ngo.component.scss',
})
export class NgoComponent {
  constructor(private api: ApiService) {}
  submitted = false;
  disabled = false;
  contactNgo: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._\s]{3,20}$/), // Allows spaces
    ]),
    ngoName: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._\s]{3,20}$/), // Allows spaces
    ]),
    company_website: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
      ),
    ]),
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._\s]{3,20}$/),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    number: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?:\+?\d{1,4}[\s-]?)?(?:\(?\d{1,4}\)?[\s-]?)?\d{7,10}$/
      ),
    ]),
    number_of_Headcount: new FormControl(null, [
      Validators.required,
      Validators.min(2),
      Validators.max(120),
    ]),
    number_of_total_Positions: new FormControl(null, [
      Validators.required,
      Validators.min(2),
      Validators.max(120),
    ]),
  });

  getFormData(contactNgo: any) {
    this.disabled = true;
    this.api.post('NGO', contactNgo.value).subscribe({
      next: (response) => {
        this.contactNgo.reset();
        this.submitted = false;
        this.disabled = false;
      },
      error: (error) => {
        this.disabled = false;
        this.submitted = false;
        console.error('Error submitting form', error);
      },
    });
  }
}
