import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enhance-solution',
  imports: [RouterLink,RouterLinkActive,RouterModule,CommonModule],
  templateUrl: './enhance-solution.component.html',
  styleUrl: './enhance-solution.component.scss'
})
export class EnhanceSolutionComponent {

  backgroundImage = '/Image.png'; // Initial background image URL

  toggleBackground() {
    // Toggle between two background image URLs
    this.backgroundImage = this.backgroundImage === '/Image.png' ? '/Image2.png' : '/Image.png';
  }

// fixing img 
  isJet = true; // Flag to toggle content

  jetImage = 'public/Image.png'; // Background image for JET
  eesImage = 'public/Image2.png'; // Background image for EES

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
  

  toggleContent() {
    this.isJet = !this.isJet; // Toggle between JET and EES
  }
}
