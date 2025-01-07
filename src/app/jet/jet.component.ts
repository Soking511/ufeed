import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {FormControl,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';

@Component({
  selector: 'app-jet',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './jet.component.html',
  styleUrl: './jet.component.scss'
})
export class JetComponent {

// form data 
jetForm:FormGroup= new FormGroup({
  
})


// hover elements 
  hoveredIndex: number | null = null;

  onMouseOver(index: number) {
    this.hoveredIndex = index; // Highlight the hovered row
  }

  onMouseOut() {
    this.hoveredIndex = null; // Reset the hover effect
  }
  
}
