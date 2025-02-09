import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {NewsSectionComponent} from '../news-section/news-section.component'

@Component({
  selector: 'app-news',
  imports: [CommonModule,RouterModule,NewsSectionComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {

}
