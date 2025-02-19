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
      image: 'public/jet/langs.png',
      title: 'Bilingual - “Arabic/English”',
      description: 'UFeed JET provides an Arabic-English interface.',
    },
    {
      image: 'public/jet/stars.png',
      title: 'Intelligent Job Evaluation',
      description: 'AI analyzes job data, identifies trends.',
    },
    {
      image: 'public/jet/part.png',
      title: 'Automated JA Data',
      description: 'JET automates data collection.',
    },
    {
      image: 'public/jet/globals.png',
      title: 'International Grading',
      description: 'Correlate JET grades with systems for reference.',
    }
   
  ];

  eesContent: any[] = [
    { title: 'Bilingual Interface',
      description: 'UFeed EES provides an Arabic-English interface.',
      icon: 'public/ees/a.png' },
    { title: 'Instant Self-Service Access',
      description: 'HR can quickly create surveys for feedback.', 
      icon: 'public/ees/b.png' },
    { title: 'Customizable Demographics', 
      description: 'Tailor demographics for better analysis.', 
      icon: 'public/ees/c.png' },
    { title: 'Benchmark Capabilities', 
      description: 'Analyze data, build benchmarks.',
       icon: 'public/ees/d.png' },
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
