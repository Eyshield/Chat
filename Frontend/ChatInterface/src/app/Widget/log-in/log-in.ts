import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css',
})
export class LogIn {
  constructor(private router: Router) {}
  navigateToSignUp() {
    this.router.navigate(['/SignUp']);
  }
}
