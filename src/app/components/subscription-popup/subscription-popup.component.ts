import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-popup.component.html',
  styleUrls: ['./subscription-popup.component.scss'],
})
export class SubscriptionPopupComponent {
  @Output() closePopup = new EventEmitter<void>();
  isVisible = false;

  constructor(private router: Router) {}

  openPopup() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
    this.closePopup.emit();
  }

  navigateToRegistration() {
    this.close();
    // Navigate to the registration page
    this.router.navigate(['/app-jet-course']);
  }
}
