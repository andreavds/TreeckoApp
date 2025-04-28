import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthheaderComponent } from '../../components/authheader/authheader.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, AuthheaderComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 })),
      ]),
    ])
  ]
})

export class RegisterComponent {

  registerInfo = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  register(): void {
    if (this.registerInfo.password !== this.registerInfo.confirmPassword) {
      this.errorMessage = "Passwords do not match.";
      return;
    }

    const payload = {
      username: this.registerInfo.username,
      email: this.registerInfo.email,
      password: this.registerInfo.password
    };

    const url = 'http://localhost:3000/auth/register';

    this.http.post<{ message: string }>(url, payload).subscribe({
      next: (response) => {
        console.log("Registration successful:", response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error("Registration failed:", error);
        this.errorMessage = error.error.message || "Registration failed. Please try again.";
      }
    });
  }
}