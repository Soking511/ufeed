import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-become-apartner',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './become-apartner.component.html',
  styleUrls: ['./become-apartner.component.scss']
})
export class BecomeAPartnerComponent {
  becomePartner: FormGroup = new FormGroup({
    companyName: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._]{3,20}$/)
    ]),
    companyAddress: new FormControl(),
    companyWebsite: new FormControl(),
    companyNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?:\+?\d{1,4}[\s-]?)?(?:\(?\d{1,4}\)?[\s-]?)?\d{7,10}$/)
    ]),
    personalProfile: new FormControl(),
    personalName: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^(?!.*[_.]{2})[a-zA-Z._]{3,20}$/)
    ]),
    title: new FormControl(),
    email: new FormControl(null, [Validators.required, Validators.email]),
    mobile: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?:\+?\d{1,4}[\s-]?)?(?:\(?\d{1,4}\)?[\s-]?)?\d{7,10}$/)
    ])
  });

  // Inject HttpClient
  constructor(private http: HttpClient) {}

  // Function to handle form submission
  onSubmit() {
    if (this.becomePartner.valid) {
      // Prepare form-data
      const formData = new FormData();
      Object.keys(this.becomePartner.value).forEach((key) => {
        formData.append(key, this.becomePartner.get(key)?.value);
      });

      // Replace with your API endpoint
      const apiUrl = 'https://ufeed-node-server-production.up.railway.app/partner-request/add-partner-request';

      // Send the form-data
      this.http.post(apiUrl, formData).subscribe({
        next: (response) => console.log('Success:', response),
        error: (err) => console.error('Error:', err)
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
