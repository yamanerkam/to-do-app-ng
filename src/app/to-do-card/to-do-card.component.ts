import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';

import { DatePipe } from '@angular/common';
// sadece date pipe ile isimi cozdum

// import { CommonModule } from "@angular/common"; => common mudlu agir bir modul ve her componinta bunu eklemeye gerek yok sadece gerekli directiveleri ve pipeleri ayri olarak import edebiliriz
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

import { NonSingletonService } from '../services/non-singleton.service';
import { AppService, TodoItem } from '../app.service';

@Component({
  selector: 'app-to-do-card',
  imports: [CardModule, ButtonModule, DialogModule, ConfirmDialogModule, FormsModule, CalendarModule, DatePipe],
  standalone: true,
  templateUrl: './to-do-card.component.html',
  styleUrl: './to-do-card.component.css',
  providers: [NonSingletonService]
})
export class ToDoCardComponent implements OnInit {
  @Input() todo!: TodoItem;

  ngOnInit(): void {}

  constructor(
    private confirmationService: ConfirmationService,
    private appService: AppService
  ) {}

  confirmDelete(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this task?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.appService.deleteToDo(id).subscribe({
          next: () => console.log('Deleted successfully'),
          error: (err) => alert(err.message)
        });
      }
    });
  }

  openEdit() {
    this.appService.todoFormToggler('edit', this.todo);
  }
}
