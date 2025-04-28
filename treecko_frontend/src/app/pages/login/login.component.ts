import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthheaderComponent } from '../../components/authheader/authheader.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AuthheaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const credentials = { email: this.email, password: this.password };
  
    this.authService.login(credentials).subscribe({
      next: (response: any) => {
        console.log('Login response:', response);
  
        if (response && response.token) {
          console.log('Token received:', response.token);
          this.authService.saveToken(response.token);
          this.router.navigate(['/home']); 
        } else {
          this.errorMessage = 'No token received. Check the server';
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage =
          error?.error?.message || 'Invalid email or password.';
      },
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }
  
}