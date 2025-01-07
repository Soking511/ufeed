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
      description: 'The tool\'s reports ensure you have accurate data at your fingertips.',
    },
    {
      image: 'public/icons/Dashboard.png',
      title: 'User-Friendly Interface',
      description: 'Users can quickly access bilingual translation capabilities.',
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
    { title: 'Customizable Analytics Reporting', description: 'The tool ensures accurate data at your fingertips.', icon: 'public/icons/si_dashboard-customize-line.png' },
    { title: 'Survey Progress Monitoring Dashboard', description: 'Protecting your sensitive data with encryption.', icon: 'public/icons/hugeicons_web-design-01.png' },
    { title: 'Designed by Top-Notch HR Experts', description: 'Users can quickly access bilingual translation capabilities.', icon: 'public/icons/iconoir_design-nib.png' },
    { title: 'Instant Access Self Service Platform', description: 'It enables users to manage translations independently.', icon: 'public/icons/system-uicons_lightning.png' },
  ];
  

  toggleContent() {
    this.isJet = !this.isJet; // Toggle between JET and EES
  }
}
