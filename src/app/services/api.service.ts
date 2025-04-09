import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postFormData(formData: any, endpoint: string) {
    this.http.post(`https://soking.tech/api/${endpoint}/`, formData.value)
      .subscribe({
        next:(res) => {

          console.log('Form data submitted successfully:', res);
        },
        error:(err) => {
          console.error('Error occurred while submitting form data:', err);
        },
        complete: () => {
        }
      })
  }


}
