import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-enhance-solution',
  imports: [RouterLink, RouterLinkActive, RouterModule, CommonModule, TranslateModule],
  templateUrl: './enhance-solution.component.html',
  styleUrls: ['./enhance-solution.component.scss']
})
export class EnhanceSolutionComponent implements OnInit {
  
  backgroundImage = '/Image.png'; // Initial background image URL

  // Initial image paths for JET and EES
  jetImage = 'public/image.png'; // Background image for JET
  eesImage = 'public/Imageees.png'; // Background image for EES

  isJet = true; // Flag to toggle content

  ngOnInit() {
    this.updateImagesBasedOnLanguage(); // Check language and update images
  }

  toggleContent() {
    this.isJet = !this.isJet; // Toggle between JET and EES
  }

  toggleBackground() {
    // Toggle between two background image URLs
    this.backgroundImage = this.backgroundImage === '/Imagejet.png' ? '/Imageees.png' : '/Imagjet.png';
  }

  // Method to update images based on language
  updateImagesBasedOnLanguage() {
    const currentLanguage = localStorage.getItem('language') || 'en'; // Get current language (default to 'en')
    
    if (currentLanguage === 'ar') {
      // Change images for Arabic language
      this.jetImage = 'public/aImage.png'; // Arabic background image for JET
      this.eesImage = 'public/bImage.png'; // Arabic background image for EES
    } else {
      // Default images for English language
      this.jetImage = 'public/Image.png'; 
      this.eesImage = 'public/Image2.png';
    }
  }

  
}
