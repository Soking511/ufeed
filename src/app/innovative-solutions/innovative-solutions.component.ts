import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../services/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-innovative-solutions',
  imports: [CommonModule,TranslateModule],
  templateUrl: './innovative-solutions.component.html',
  styleUrl: './innovative-solutions.component.scss'
})
export class InnovativeSolutionsComponent {
  get icons( ){
    return './icons/ph_arrow-up-thin.png';
  }

  // ---
  activeIndex: number | null = null; 
  hoveredIndex: number | null = null; 
  onMouseOver(index: number) {
    this.hoveredIndex = index; 
  }

  onMouseOut() {
    this.hoveredIndex = null; 
  }

  onSelect(index: number) {
    this.activeIndex = index; 
  }

  isDimmed(index: number): boolean {
   
    return (
      (this.hoveredIndex !== null && this.hoveredIndex !== index) ||
      (this.activeIndex !== null && this.activeIndex !== index)
    );
  }
  solutions = [
    {
      icon: 'public/icons/teenyicons_tick-circle-outline.png',
      title: 'innovation.feature.holistic_title',
      description: 'innovation.feature.holistic_desc',
    },
    {
      icon: 'public/icons/ph_user-focus-thin.png',
      title: 'innovation.feature.user_friendly_title',
      description: 'innovation.feature.user_friendly_desc',
    },
    {
      icon: 'public/icons/hugeicons_customize.png',
      title: 'innovation.feature.custom_access_title',
      description: 'innovation.feature.custom_access_desc',
    },
    {
      icon: 'public/icons/iconamoon_shield-thin.png',
      title: 'innovation.feature.self_service_title',
      description: 'innovation.feature.self_service_desc',
    },
    {
      icon: 'public/icons/hugeicons_stars.png',
      title: 'innovation.feature.ai_enabled_title',
      description: 'innovation.feature.ai_enabled_desc',
    },
    {
      icon: 'public/icons/circum_dollar.png',
      title: 'innovation.feature.cost_affordability_title',
      description: 'innovation.feature.cost_affordability_desc',
    }
  ];
  
  
}
