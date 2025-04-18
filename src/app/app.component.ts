import { Component, Renderer2 } from '@angular/core';
import {
  RouterOutlet,
  ActivatedRoute,
  Router,
  RouterModule,
} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TranslationService } from './services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { routes } from './app.routes';
import { ScrollService } from './services/scroll.service';
import { ToastComponent } from './components/toast/toast.component'; // Import ScrollService
import { ScrollRestorationService } from './services/scroll-restoration.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    ToastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'uFeed';
  currentLanguage: string = 'en';

  constructor(
    private translationService: TranslationService,
    private translate: TranslateService, // Inject TranslateService
    private renderer: Renderer2,
    private router: Router,
    private scrollService: ScrollRestorationService
  ) {}

  ngOnInit(): void {
    // Detect language from localStorage or default to English
    const savedLanguage = localStorage.getItem('language') || 'en';

    // Check if the URL contains "/ar" and override the detected language
    if (this.router.url.startsWith('/ar')) {
      this.currentLanguage = 'ar';
    } else {
      this.currentLanguage = savedLanguage;
    }

    // Load the detected language
    this.translationService.loadLanguage(this.currentLanguage);
    this.updateDocumentDirection();
  }

  changeLanguage(language: string): void {
    if (this.currentLanguage === language) return; // Prevent unnecessary reloads

    this.currentLanguage = language;
    localStorage.setItem('language', language);
    this.translationService.loadLanguage(language);
    this.updateDocumentDirection();

    // Force Angular to refresh the content dynamically
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }

  private updateDocumentDirection(): void {
    const htmlTag = document.documentElement;
    if (this.currentLanguage === 'ar') {
      this.renderer.setAttribute(htmlTag, 'lang', 'ar');
      this.renderer.setAttribute(htmlTag, 'dir', 'rtl');
    } else {
      this.renderer.setAttribute(htmlTag, 'lang', 'en');
      this.renderer.setAttribute(htmlTag, 'dir', 'ltr');
    }
  }

  onHeaderHeightChanged(height: number) {
    // Update body padding to match header height
    this.renderer.setStyle(document.body, 'padding-top', `${height}px`);
  }
}
