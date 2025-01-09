import { Component, HostListener, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isScrolled: boolean = false;
  isHomePage: boolean = false;

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Detect if the current route is the home page
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isHomePage = event.url === '/'; // Update '/' if your home route is different
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 50; // Adjust threshold as needed
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
}
