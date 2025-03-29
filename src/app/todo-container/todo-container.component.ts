import { Component } from '@angular/core';
import { ToDoCardComponent, TodoItem } from '../to-do-card/to-do-card.component';
import { AppService } from '../app.service';

@Component({
  selector: 'app-todo-container',
  imports: [ToDoCardComponent],
  templateUrl: './todo-container.component.html',
  styleUrl: './todo-container.component.css'
})
export class TodoContainerComponent {
  todoList: TodoItem[] = [];
  
  constructor(appService:AppService){
    this.todoList = appService.todoList;
  }
}
