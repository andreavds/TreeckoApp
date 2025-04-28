import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string = "null";

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      this.http.get<{ user: { username: string } }>('http://localhost:3000/auth/userinfo', { headers }).subscribe({
        next: (data) => {
          console.log('Fetched user info:', data);
          this.username = data.user.username;
        },
        error: (error) => {
          console.error('Error fetching user info:', error);
          this.username = 'User';
        }
      });
    }
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}