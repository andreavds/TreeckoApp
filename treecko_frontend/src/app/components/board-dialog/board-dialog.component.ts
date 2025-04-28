import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board-dialog',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './board-dialog.component.html',
  styleUrls: ['./board-dialog.component.css'],
})
export class BoardDialogComponent {
  title = ''; 
  errorMessage = ''; 

  @Output() createBoard = new EventEmitter<string>();

  submitTitle(): void {
    if (!this.title.trim()) {
      this.errorMessage = 'Title cannot be empty';
      return;
    }
    this.createBoard.emit(this.title);
    this.title = '';
    this.errorMessage = '';
  }
}