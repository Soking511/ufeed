import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-innovative-solutions',
  imports: [CommonModule],
  templateUrl: './innovative-solutions.component.html',
  styleUrl: './innovative-solutions.component.scss'
})
export class InnovativeSolutionsComponent {
  get icons( ){
    return './icons/ph_arrow-up-thin.png';
  }

  // ---
  activeIndex: number | null = null; // Track the selected solution
  hoveredIndex: number | null = null; // Track the hovered solution

  onMouseOver(index: number) {
    this.hoveredIndex = index; // Set the hovered index
  }

  onMouseOut() {
    this.hoveredIndex = null; // Reset hover effect
  }

  onSelect(index: number) {
    this.activeIndex = index; // Set the clicked solution as active
  }

  isDimmed(index: number): boolean {
    // Check if the current solution should be dimmed
    return (
      (this.hoveredIndex !== null && this.hoveredIndex !== index) ||
      (this.activeIndex !== null && this.activeIndex !== index)
    );
  }

  solutions = [
    {
      icon: 'public/icons/teenyicons_tick-circle-outline.png',
      title: 'Holistic Solutions',
      description:
        'UFeed is powering the HC industry with limitless solutions through access to knowledge of well-structured methodologies and tools as well as data analytics utilization.',
    },
    {
      icon: 'public/icons/ph_user-focus-thin.png',
      title: 'User Friendly Focus',
      description:
        'Solutions are built to be easily accessible and user-friendly, so staff members can access UFeed solutions with ease.',
    },
    {
      icon: 'public/icons/hugeicons_customize.png',
      title: 'Custom Access Management',
      description:
        'Empowers customizing interface for each client based on their needs to validate who has which access level to do what!',
    },
    {
      icon: 'public/icons/iconamoon_shield-thin.png',
      title: 'Self Service Guided with Expertise',
      description:
        'Leveraging over 25 years of expertise, we empower organizations by equipping them with the skills to independently implement and maximize the benefits of our solutions.',
    },
    {
      icon: 'public/icons/hugeicons_stars.png',
      title: 'AI-Enabled with Power of Data',
      description:
        'Empowers customizing interface for each client based on their needs to validate who has which access level to do what!',
    },
    {
      icon: 'public/icons/circum_dollar.png',
      title: 'UFeed Cost Affordability',
      description:
        'Compared to other competitors/alternatives in the HR/HC domain, UFeed represents a very affordable cost vs value.',
    },
  ];
  
}
