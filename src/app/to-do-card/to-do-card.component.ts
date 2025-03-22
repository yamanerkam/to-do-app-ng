import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

export interface TodoItem {
  id: number;
  title: string;
  description: string;
  status: string;        
  createdOn: Date;       
}

@Component({
  selector: 'app-to-do-card',
  imports: [CardModule,CommonModule,ButtonModule,DialogModule,
    ConfirmDialogModule,FormsModule,CalendarModule],
  standalone: true,
  providers: [ConfirmationService],
  templateUrl: './to-do-card.component.html',
  styleUrl: './to-do-card.component.css'
})
export class ToDoCardComponent {
  @Input() todo!: TodoItem;

  displayEdit = false;

  constructor(private confirmationService: ConfirmationService) {}

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this task?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('Deleted');
      }
    });
  }

  openEdit() {
    this.displayEdit = true;
  }
}
