import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AppService, TodoItem } from '../app.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-todo-table',
  imports: [TableModule,AsyncPipe],
  templateUrl: './app-todo-table.component.html',
  styleUrl: './app-todo-table.component.css'
})
export class TodoTableComponent {
  todoList: TodoItem[] = []

  constructor(public appService:AppService){
    // appService.todoListObs$.subscribe((data: TodoItem[]) => {
    //   this.todoList = data;
    // });
  }
}
