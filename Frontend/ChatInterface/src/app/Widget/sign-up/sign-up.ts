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
  selectedFile: File | null = null;
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
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.previewImage = URL.createObjectURL(file);
    } else {
      this.selectedFile = null;
      this.previewImage = null;
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

      for (const [key, value] of Object.entries(this.signUpForm.value)) {
        if (!['image', 'confirmPassword'].includes(key)) {
          formData.append(key, value as string);
        }
      }
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
      this.auth.register(formData).subscribe({
        next: (response) => {
          this.router.navigate(['/Chat']);
        },
        error: (err) => {
          console.error('Erreur de connexion', err);
        },
      });
    }
  }
}
