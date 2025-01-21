import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BecomeAPartnerComponent } from './become-apartner/become-apartner.component';
import { JetComponent } from './jet/jet.component';
import { EesComponent } from './ees/ees.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HcDigitizedMethodologiesToolsComponent } from './hc-digitized-methodologies-tools/hc-digitized-methodologies-tools.component';
import { HcDataAnalyticsBenchmarkingComponent } from './hc-data-analytics-benchmarking/hc-data-analytics-benchmarking.component';
import { NewsComponent } from './news/news.component';
import { JetCourseComponent } from './jet-course/jet-course.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},    
    {path:"home",component:HomeComponent},    
    {path:"about",component:AboutComponent},
    {path:"become-apartner",component:BecomeAPartnerComponent},
    {path:"jet",component:JetComponent},
    {path:"ees",component:EesComponent},
    {path:"coming-soon",component:ComingSoonComponent},
    {path:"contact-us",component:ContactUsComponent},
    {path:"hc-digitized-methodologies-tools",component:HcDigitizedMethodologiesToolsComponent},
    {path:"hc-data-analytics-benchmarking",component:HcDataAnalyticsBenchmarkingComponent},
    {path:"news",component:NewsComponent},
    {path:"japp-jet-course",component:JetCourseComponent},
    {path:"**",component:NotFoundComponent},

];
