
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { ClientsComponent } from '../clients/clients.component';
import { InnovativeSolutionsComponent } from '../innovative-solutions/innovative-solutions.component';
import { EnhanceSolutionComponent } from '../enhance-solution/enhance-solution.component';
import { BecomePartnerComponent } from '../become-partner-section/become-partner.component';
import { ContactSectionComponent } from '../contact-section/contact-section.component';
import {WorkPerformanceComponent} from '../work-performance/work-performance.component'
import { CourseSectionComponent } from '../course-section/course-section.component';
import { GicgComponent } from '../gicg/gicg.component';
import {NgoSectionComponent} from '../ngo-section/ngo-section.component';
import { ScrollService } from '../services/scroll.service'; // Import ScrollService
import { NewsSectionComponent } from '../news-section/news-section.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterModule,HeroSectionComponent,InnovativeSolutionsComponent,
    ClientsComponent,EnhanceSolutionComponent,
      BecomePartnerComponent,ContactSectionComponent,WorkPerformanceComponent,
      CourseSectionComponent,GicgComponent,NgoSectionComponent,NewsSectionComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
 
}
