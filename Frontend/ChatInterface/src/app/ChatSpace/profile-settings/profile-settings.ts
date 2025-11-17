import { Component, OnInit } from '@angular/core';
import { Users } from '../../Services/users';
import { CookieService } from 'ngx-cookie-service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-profile-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-settings.html',
  styleUrl: './profile-settings.css',
})
export class ProfileSettings implements OnInit {
  imageUrl: any;
  previewImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  constructor(private userService: Users, private cookie: CookieService) {}
  id: number = 0;
  ProfilForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    image: new FormControl(),
  });

  ngOnInit() {
    this.LoadUserData();
  }
  LoadUserData() {
    this.id = Number(this.cookie.get('user_Id'));
    this.userService.getUserById(this.id).subscribe((data) => {
      this.ProfilForm.patchValue({
        nom: data.nom,
        prenom: data.prenom,
        username: data.username,
        email: data.email,
      });
      this.imageUrl = data.imageUrl;
    });
  }
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

  UpdateProfil() {
    if (this.ProfilForm.valid) {
      const formData = new FormData();

      for (const [key, value] of Object.entries(this.ProfilForm.value)) {
        if (!['image', 'confirmPassword'].includes(key)) {
          formData.append(key, value as string);
        }
      }
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
      this.userService.updateUser(this.id, formData).subscribe({
        next: (response) => {
          this.LoadUserData();
        },
        error: (err) => {
          console.error('Erreur de connexion', err);
        },
      });
    }
  }
}
