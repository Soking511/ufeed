import {
  Component,
  HostListener,
  Renderer2,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() headerHeightChanged = new EventEmitter<number>();
  isScrolled: boolean = false;
  isHomePage: boolean = false;
  currentLanguage: string = 'en';

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    // ✅ Scroll to top on navigation
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scrolling to top
      });

    // ✅ Detect if the current route is the home page
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isHomePage = event.url === '/'; // Update if home route is different
      });

    // ✅ Set initial language
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.translationService.loadLanguage(this.currentLanguage);
    this.updateDocumentDirection();

    // Initial header height calculation
    setTimeout(() => {
      this.emitHeaderHeight();
    }, 100);
  }

  ngAfterViewInit() {
    // Emit the header height after view initialization
    this.emitHeaderHeight();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const wasScrolled = this.isScrolled;
    this.isScrolled = scrollPosition > 50; // Adjust threshold as needed

    // If scroll state changed, emit new header height
    if (wasScrolled !== this.isScrolled) {
      setTimeout(() => {
        this.emitHeaderHeight();
      }, 400); // Wait for transition to complete
    }
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.emitHeaderHeight();
  }

  get logoPath(): string {
    return this.isHomePage
      ? 'public/logo-Ufeed.png' // Home page logo
      : 'public/logo-Ufeed-small.png'; // Other pages logo
  }

  openDropdown(event: Event): void {
    const dropdownElement = (event.target as HTMLElement).closest('.dropdown');
    if (dropdownElement) {
      this.renderer.addClass(dropdownElement, 'show');
      const menu = dropdownElement.querySelector('.dropdown-menu');
      if (menu) {
        this.renderer.addClass(menu, 'show');
      }
    }
  }

  closeDropdown(event: Event): void {
    const dropdownElement = (event.target as HTMLElement).closest('.dropdown');
    if (dropdownElement) {
      this.renderer.removeClass(dropdownElement, 'show');
      const menu = dropdownElement.querySelector('.dropdown-menu');
      if (menu) {
        this.renderer.removeClass(menu, 'show');
      }
    }
  }

  // ✅ Change language, scroll to top, and update document direction
  switchLanguage(lang: string): void {
    if (this.currentLanguage === lang) return; // Prevent unnecessary reloads

    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    this.translationService.loadLanguage(lang);
    this.updateDocumentDirection();

    // ✅ Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // ✅ Reload the same page to apply the changes correctly
    this.router.navigateByUrl(this.router.url, { skipLocationChange: false });

    console.log(`Switching to: ${lang}`);
  }

  private updateDocumentDirection(): void {
    const htmlTag = document.documentElement;
    const bodyTag = document.body;

    if (this.currentLanguage === 'ar') {
      this.renderer.setAttribute(htmlTag, 'lang', 'ar');
      this.renderer.setAttribute(htmlTag, 'dir', 'rtl');
      this.renderer.addClass(bodyTag, 'rtl'); // Add RTL class to body
    } else {
      this.renderer.setAttribute(htmlTag, 'lang', 'en');
      this.renderer.setAttribute(htmlTag, 'dir', 'ltr');
      this.renderer.removeClass(bodyTag, 'rtl'); // Remove RTL class from body
    }
  }

  private emitHeaderHeight() {
    const headerHeight = this.elementRef.nativeElement.offsetHeight;
    this.headerHeightChanged.emit(headerHeight);
  }
}
