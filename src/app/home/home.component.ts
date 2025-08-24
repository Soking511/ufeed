import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { ClientsComponent } from '../clients/clients.component';
import { InnovativeSolutionsComponent } from '../innovative-solutions/innovative-solutions.component';
import { EnhanceSolutionComponent } from '../enhance-solution/enhance-solution.component';
import { BecomePartnerComponent } from '../become-partner-section/become-partner.component';
import { ContactSectionComponent } from '../contact-section/contact-section.component';
import { WorkPerformanceComponent } from '../work-performance/work-performance.component';
import { CourseSectionComponent } from '../course-section/course-section.component';
import { GicgComponent } from '../gicg/gicg.component';
import { NgoSectionComponent } from '../ngo-section/ngo-section.component';
import { ScrollService } from '../services/scroll.service'; // Import ScrollService
import { NewsSectionComponent } from '../news-section/news-section.component';
import { TranslateModule } from '@ngx-translate/core';
import { SubscriptionPopupComponent } from '../components/subscription-popup/subscription-popup.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    HeroSectionComponent,
    InnovativeSolutionsComponent,
    ClientsComponent,
    EnhanceSolutionComponent,
    BecomePartnerComponent,
    ContactSectionComponent,
    WorkPerformanceComponent,
    CourseSectionComponent,
    GicgComponent,
    NgoSectionComponent,
    NewsSectionComponent,
    TranslateModule,
    SubscriptionPopupComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('subscriptionPopup') subscriptionPopup:
    | SubscriptionPopupComponent
    | undefined;

  ngOnInit() {
    // Check if this is the user's first visit to the home page
    this.checkFirstVisit();
  }

  ngAfterViewInit() {
    // Ensure the popup component is available before trying to open it
    setTimeout(() => {
      this.checkFirstVisit();
    }, 100);
  }

  private checkFirstVisit() {
    // const hasVisitedHome = localStorage.getItem('hasVisitedHome');

    if (this.subscriptionPopup) {
      // This is the first visit, show the welcome popup
      setTimeout(() => {
        this.subscriptionPopup?.openPopup();
        // Mark that the user has visited the home page
        // localStorage.setItem('hasVisitedHome', 'true');
      }, 1000); // Show popup after 2 seconds for better UX
    }
  }
}
