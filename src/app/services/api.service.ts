import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseURL: string;

  constructor(private http: HttpClient, private toastService: ToastService) {
    this.baseURL = 'https://api-ufeed.pulslytics.agency/api/';
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return headers;
  }

  get<T>(route: string, page: number = 5, query?: string): Observable<any> {
    const headers = this.getHeaders();
    const queryParams = [];

    if (page) queryParams.push(`page=${page}`);
    if (query) queryParams.push(query);

    const queryString =
      queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    const url = `${this.baseURL}${route}/`;

    return this.http.get<any>(url, {
      headers,
      withCredentials: true,
    });
  }

  post<T>(route: string, data: any): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.baseURL}${route}/`;

    // Ensure data is properly formatted as JSON
    const jsonData = typeof data === 'string' ? data : JSON.stringify(data);

    return this.http
      .post<any>(url, jsonData, {
        headers,
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.toastService.success('Form Sent');
          return response;
        }),
        catchError((error) => {
          const errorMessage =
            error.error?.detail || 'An error occurred. Please try again.';
          this.toastService.error(errorMessage);
          return throwError(() => error);
        })
      );
  }

  postFormData(route: string, formData: FormData): Observable<any> {
    // For FormData, don't set Content-Type header, browser will set it with boundary
    const headers = new HttpHeaders();
    const url = `${this.baseURL}${route}/`;

    return this.http
      .post<any>(url, formData, {
        headers,
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.toastService.success('Form submitted successfully');
          return response;
        }),
        catchError((error) => {
          const errorMessage =
            error.error?.detail || 'Form submission failed. Please try again.';
          this.toastService.error(errorMessage);
          return throwError(() => error);
        })
      );
  }

  put<T>(route: string, data: any): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.baseURL}${route}`;

    const options = {
      headers,
      withCredentials: true,
    };

    return this.http.put<any>(url, data, options);
  }

  delete<T>(route: string, requiresAuth: boolean = true): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.baseURL}${route}`;

    return this.http.delete<any>(url, {
      headers,
      withCredentials: true,
    });
  }

  fetch<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
}
