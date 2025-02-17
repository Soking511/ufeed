import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    // Append timestamp to prevent caching
    const url = `/i18n/${lang}.json?timestamp=${new Date().getTime()}`;
    return this.http.get(url);
  }
}
