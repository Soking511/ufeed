import { Component } from '@angular/core';
import {FormControl,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';

@Component({
  selector: 'app-ngo',
  imports: [ReactiveFormsModule],
  templateUrl: './ngo.component.html',
  styleUrl: './ngo.component.scss'
})
export class NgoComponent {

  contactNgo:FormGroup = new FormGroup({
    
  })

}
