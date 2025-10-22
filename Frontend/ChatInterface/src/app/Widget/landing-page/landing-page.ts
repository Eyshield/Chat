import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  faTelegram = faTelegram;
  menuDrop: boolean = false;
}
