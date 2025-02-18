import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translateService: TranslateService) {}

  // ✅ Load and set the selected language
  loadLanguage(language: string): void {
    console.log(`Switching to: ${language}`);
    this.translateService.use(language).subscribe({
      next: () => console.log(`Language switched to: ${language}`),
      error: (error) => console.error("Translation load error:", error)
    });
  }
}
