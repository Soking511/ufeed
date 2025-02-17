import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(
    private translateService: TranslateService,
    private httpClient: HttpClient,
  ) {}

  loadLanguage(language: string): void {
    // Use the language with ngx-translate
    this.translateService.use(language);

    // Load translations if not already loaded
    this.loadTranslations(language);
  }

  loadTranslations(language: string): void {
    // Check if translations are already loaded to avoid reloading them
    if (this.translateService.translations[language]) {
      return; // Translations already loaded
    }

    // Fetch translations from assets/i18n/ or any external source
    this.httpClient
      .get(`assets/i18n/${language}.json`)
      .subscribe((translations) => {
        this.translateService.setTranslation(language, translations);
      });
  }
}
