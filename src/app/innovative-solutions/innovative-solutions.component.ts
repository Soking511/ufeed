import { Component } from '@angular/core';

@Component({
  selector: 'app-innovative-solutions',
  imports: [],
  templateUrl: './innovative-solutions.component.html',
  styleUrl: './innovative-solutions.component.scss'
})
export class InnovativeSolutionsComponent {
  get icons( ){
    return '/icons/ph_arrow-up-thin.png';
  }
}
