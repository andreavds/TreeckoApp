import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
interface BoardNavigationState {
  boardName?: string;
}

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  boardTitle: string = '';
  tasks: Array<{ id: number; title: string; description: string; status: number }> = [];
  draftTasks: { [key: number]: { title: string; description: string } | null } = {
    1: null,
    2: null,
    3: null,
  };
  currentlyEditingTaskId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const boardId = this.route.snapshot.paramMap.get('id');
    const state = window.history.state as BoardNavigationState | undefined;
    console.log('Board navigation state:', state);
    
    const boardName = state?.boardName;
    this.boardTitle = boardName ? boardName : `Board ${boardId}`;
    
    this.fetchTasks(boardId);
  }
  

  fetchTasks(boardId: string | null): void {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http
      .get<{ tasks: { id: number; title: string; description: string; status: number }[] }>(
        `http://localhost:3000/api/boards/${boardId}/tasks`,
        { headers }
      )
      .subscribe({
        next: (response) => {
          console.log('Tasks fetched:', response);
          this.tasks = Array.isArray(response.tasks) ? response.tasks : [];
        },
        error: (error) => {
          console.error('Failed to fetch tasks:', error);
        },
      });
  }

  openCreateTaskRectangle(status: number): void {
    this.draftTasks[status] = { title: '', description: '' };
    this.currentlyEditingTaskId = null;
  }

  saveTask(status: number): void {
    const draftTask = this.draftTasks[status];
    if (!draftTask?.title || !draftTask?.description) {
      alert('Both title and description are required!');
      return;
    }

    const newTask = {
      ...draftTask,
      status: status,
    };

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http
      .post<{ message: string }>(
        `http://localhost:3000/api/boards/${this.route.snapshot.paramMap.get('id')}/tasks`,
        newTask,
        { headers }
      )
      .subscribe({
        next: (response) => {
          console.log('Task created successfully:', response.message);
          this.fetchTasks(this.route.snapshot.paramMap.get('id'));
          this.draftTasks[status] = null;
        },
        error: (error) => {
          console.error('Failed to create task:', error);
        },
      });
  }

  editTask(task: { id: number; title: string; description: string; status: number }): void {
    this.draftTasks[task.status] = { title: task.title, description: task.description }; 
    this.currentlyEditingTaskId = task.id; 
  }

  cancelEditTask(status: number): void {
    this.draftTasks[status] = null; 
    this.currentlyEditingTaskId = null; 
  }

  saveEditedTask(status: number): void {
    const draftTask = this.draftTasks[status];
    if (!draftTask?.title || !draftTask?.description) {
      alert('Both title and description are required!');
      return;
    }

    const updatedTask = {
      ...draftTask,
      status: status,
    };

  
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
  
    this.http
      .put<{ message: string }>(
        `http://localhost:3000/api/tasks/${this.currentlyEditingTaskId}`,
        updatedTask,
        { headers }
      )
      .subscribe({
        next: (response) => {
          console.log('Task updated successfully:', response.message);
          this.fetchTasks(this.route.snapshot.paramMap.get('id')); 
          this.draftTasks[status] = null;
          this.currentlyEditingTaskId = null;
        },
        error: (error) => {
          console.error('Failed to update task:', error);
        },
      });
  }

  deleteTask(task: { id: number }): void {
  
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
  
    this.http
      .delete<{ message: string }>(
        `http://localhost:3000/api/tasks/${task.id}`,
        { headers }
      )
      .subscribe({
        next: (response) => {
          console.log('Task deleted successfully:', response.message);
          this.fetchTasks(this.route.snapshot.paramMap.get('id')); 
        },
        error: (error) => {
          console.error('Failed to delete task:', error);
        },
      });
  }


  switchTaskStatus(task: { id: number; title: string; description: string; status: number }): void {
    let newStatus: number;

    
    if (task.status === 1) {
      newStatus = 2;
    } else if (task.status === 2) {
      newStatus = 3;
    } else {
      newStatus = 1;
    }

    const updatedTask = {
      title: task.title,
      description: task.description,
      status: newStatus,
    };

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http
      .put<{ message: string }>(
        `http://localhost:3000/api/tasks/${task.id}`,
        updatedTask,
        { headers }
      )
      .subscribe({
        next: (response) => {
          console.log('Task status updated successfully:', response.message);
          this.fetchTasks(this.route.snapshot.paramMap.get('id'));
        },
        error: (error) => {
          console.error('Failed to update task status:', error);
        },
      });
    }
}