import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [TranslatePipe, ReactiveFormsModule, NgClass, NgStyle],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() Form: any;
  @Input() controlName: string = '';
  @Input() inputType: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() errorMessage: string = '';
  @Input() titleColor: string = '';
  @Input() inputColor: string = '';
  @Input() borderColor: string = '';
  @Input() backgroundColor: string = '';
}
