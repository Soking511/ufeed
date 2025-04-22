import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'become-apartner',
    loadComponent: () =>
      import('./become-apartner/become-apartner.component').then(
        (m) => m.BecomeAPartnerComponent
      ),
  },
  {
    path: 'jet',
    loadComponent: () =>
      import('./jet/jet.component').then((m) => m.JetComponent),
  },
  {
    path: 'ees',
    loadComponent: () =>
      import('./ees/ees.component').then((m) => m.EesComponent),
  },
  {
    path: 'coming-soon',
    loadComponent: () =>
      import('./coming-soon/coming-soon.component').then(
        (m) => m.ComingSoonComponent
      ),
  },
  {
    path: 'contact-us',
    loadComponent: () =>
      import('./contact-us/contact-us.component').then(
        (m) => m.ContactUsComponent
      ),
  },
  {
    path: 'news',
    loadComponent: () =>
      import('./news/news.component').then((m) => m.NewsComponent),
  },
  {
    path: 'app-jet-course',
    loadComponent: () =>
      import('./jet-course/jet-course.component').then(
        (m) => m.JetCourseComponent
      ),
  },
  {
    path: 'digitalizing-jobmaster',
    loadComponent: () =>
      import('./digitalizing-jobmaster/digitalizing-jobmaster.component').then(
        (m) => m.DigitalizingJOBMASTerComponent
      ),
  },
  {
    path: 'news-detail/:id',
    loadComponent: () =>
      import('./news-detail/news-detail.component').then(
        (m) => m.NewsDetailComponent
      ),
  },
  {
    path: 'ngo',
    loadComponent: () =>
      import('./ngo/ngo.component').then((m) => m.NgoComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
  { path: 'ar', component: HomeComponent, data: { language: 'ar' } }, // Arabic version
];
