import { Component } from '@angular/core';
import { ClientsComponent } from '../clients/clients.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [ClientsComponent,RouterLink,RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
