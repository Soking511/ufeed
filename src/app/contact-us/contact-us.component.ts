import { Component } from '@angular/core';
import { ContactSectionComponent } from '../contact-section/contact-section.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  imports: [ContactSectionComponent,RouterModule,CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {

}
