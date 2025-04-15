import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-confirmation-page',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './confirmation-page.component.html',
  styleUrl: './confirmation-page.component.scss',
})
export class ConfirmationPageComponent {

  constructor() {}

  goBackHome() {
    location.reload();
  }
}
