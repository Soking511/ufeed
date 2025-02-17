import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet,ActivatedRoute, Router,RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from "./footer/footer.component";
import { TranslationService } from './services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { routes } from './app.routes';
import { ScrollService } from './services/scroll.service'; // Import ScrollService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'uFeed';
  currentLanguage: string = 'en';

  constructor(
    private translationService: TranslationService,
    private translate: TranslateService,  // Inject TranslateService
    private renderer: Renderer2,
    private router: Router,
  ) {}

  

  ngOnInit(): void {
    // Load language from localStorage or set default to English
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.translationService.loadLanguage(this.currentLanguage);
    this.updateDocumentDirection();

    const currentUrl = this.router.url;
    if (currentUrl.startsWith('/ar')) {
      this.translationService.loadLanguage('ar');
    } else {
      this.translationService.loadLanguage('en');
    }

    // Initialize the router with scroll restoration settings
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',  // Automatically scroll to the top after each navigation
      anchorScrolling: 'enabled'         // Enables anchor link scrolling
    });
  }

  

  changeLanguage(language: string): void {
    this.currentLanguage = language;
    localStorage.setItem('language', language);  // Store in localStorage
    this.translationService.loadLanguage(language);  // Change language dynamically
    this.updateDocumentDirection();
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
}
