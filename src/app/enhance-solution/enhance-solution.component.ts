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
  jetImage = 'public/Image.png'; // Background image for JET
  eesImage = 'public/Image2.png'; // Background image for EES

  isJet = true; // Flag to toggle content

  jetContent: any[] = [
    {
      image: 'public/icons/tabler_report.png',
      title: 'Real-Time Report',
      description: 'Monitor operations with our Real-Time Report feature.',
    },
    {
      image: 'public/icons/Dashboard.png',
      title: 'User-Friendly Interface',
      description: 'Intuitive functionality simplifies complex tasks.',
    },
    {
      image: 'public/icons/streamline_database-subtract-2-raid-storage-code-disk-programming-database-array-hard-disc-minus.png',
      title: 'Safe Data Storage',
      description: 'Protecting your sensitive data with encryption.',
    },
    {
      image: 'public/icons/material-symbols-light_language.png',
      title: 'Bilingual - “Arabic/English”',
      description: 'It ensures accurate understanding in both languages.',
    },
  ];

  eesContent: any[] = [
    { title: 'Customizable Analytics Reporting',
      description: 'Unlock data with our Custom Analytics Reporting.',
      icon: 'public/icons/si_dashboard-customize-line.png' },
    { title: 'Survey Progress Monitoring Dashboard',
      description: 'Get real-time insights with our Survey Progress Dashboard.', 
      icon: 'public/icons/hugeicons_web-design-01.png' },
    { title: 'Designed by Top-Notch HR Experts', 
      description: 'offers expertise to elevate your HR strategies', 
      icon: 'public/icons/iconoir_design-nib.png' },
    { title: 'Instant Access Self Service Platform', 
      description: 'Enjoy control and convenience with our Self Service Platform.', icon: 'public/icons/system-uicons_lightning.png' },
  ];

  ngOnInit() {
    this.updateImagesBasedOnLanguage(); // Check language and update images
  }

  toggleContent() {
    this.isJet = !this.isJet; // Toggle between JET and EES
  }

  toggleBackground() {
    // Toggle between two background image URLs
    this.backgroundImage = this.backgroundImage === '/Image.png' ? '/Image2.png' : '/Image.png';
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
