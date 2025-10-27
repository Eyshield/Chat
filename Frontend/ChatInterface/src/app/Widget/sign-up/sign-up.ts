import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../Services/auth';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  constructor(private router: Router, private auth: Auth) {}
  signUpForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    image: new FormControl('', Validators.required),
  });
  previewImage: string | ArrayBuffer | null = null;
  i: number = 1;
  onFileChange(event: any, field: 'image') {
    const file = event.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      if (field === 'image') {
        this.previewImage = preview;
      }

      this.signUpForm.patchValue({ [field]: file });
    } else {
      if (field === 'image') {
        this.previewImage = null;
        this.signUpForm.patchValue({ image: null });
      }
    }
  }
  CounterI() {
    this.i++;
  }
  DecounterI() {
    this.i--;
  }
  SignUp() {
    if (this.signUpForm.valid) {
      const formData = new FormData();
      Object.entries(this.signUpForm.value).forEach(([Key, value]) =>
        formData.append(Key, value as any)
      );
      this.auth.register(formData).subscribe({
        next: (response) => {
          this.router.navigate(['/chatspace']);
        },
        error: (err) => {
          console.error('Erreur de connexion', err);
        },
      });
    }
  }
}
