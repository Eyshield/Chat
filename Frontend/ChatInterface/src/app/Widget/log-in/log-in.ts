import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../Services/auth';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css',
})
export class LogIn {
  constructor(private router: Router, private auth: Auth) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  navigateToSignUp() {
    this.router.navigate(['/SignUp']);
  }

  Login() {
    if (this.loginForm.valid) {
      const user = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };
      this.auth.Login(user).subscribe({
        next: (response) => {
          this.router.navigate(['/ChatSpace']);
        },
        error: (err) => {
          console.error('Erreur de connexion', err);
        },
      });
    }
  }
}
