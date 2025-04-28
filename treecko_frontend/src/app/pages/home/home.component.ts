import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BoardDialogComponent } from '../../components/board-dialog/board-dialog.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BoardDialogComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  boards: Array<{ id: number, name: string }> = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards(): void {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
  
    this.http.get<{ message: string; boards: { id: number; name: string; created_at: string }[] }>(
      'http://localhost:3000/api/boards', 
      { headers }
    ).subscribe({
      next: (response) => {
        console.log('Boards fetched:', response);
        this.boards = response.boards;
      },
      error: (error) => {
        console.error('Failed to fetch boards:', error);
      },
    });
  }

  onCreateBoard(title: string): void {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
  
    const newBoard = { name: title };
  
    this.http.post('http://localhost:3000/api/boards', newBoard, { headers }).subscribe({
      next: (response) => {
        console.log('Board created:', response);
        this.getBoards(); 
      },
      error: (error) => {
        console.error('Failed to create board:', error);
      },
    });
  }

  goToBoard(boardId: number, boardName: string): void {
    this.router.navigate([`/board/${boardId}`], { state: { boardName } });
  }

  
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}