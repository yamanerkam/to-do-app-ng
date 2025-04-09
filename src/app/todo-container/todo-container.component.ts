import { Component } from '@angular/core';
import { ToDoCardComponent } from '../to-do-card/to-do-card.component';
import { AppService, TodoItem } from '../app.service';

@Component({
  selector: 'app-todo-container',
  imports: [ToDoCardComponent],
  templateUrl: './todo-container.component.html',
  styleUrl: './todo-container.component.css'
})
export class TodoContainerComponent {
  todoList: TodoItem[] = [];
  
  constructor(appService:AppService){
    appService.todoListObs$.subscribe((data: TodoItem[]) => {
      this.todoList = data;
    });
  }
}
