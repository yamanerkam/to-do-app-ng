import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AppService, TodoItem } from '../app.service';

@Component({
  selector: 'app-todo-table',
  imports: [TableModule],
  templateUrl: './app-todo-table.component.html',
  styleUrl: './app-todo-table.component.css'
})
export class TodoTableComponent {
  todoList: TodoItem[] = []

  constructor(appService: AppService) {
    this.todoList = appService.todoList;
  }
}
