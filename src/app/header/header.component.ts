import { Component,HostListener,Renderer2  } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isScrolled: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 50; // Change 50 to your scroll distance
  }

 get logoPath(){
    return 'public/logo-Ufeed.png';
  }




  // -------------------
  constructor(private renderer: Renderer2) {}

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
