import { Component } from '@angular/core';
import { ToDoCardComponent } from '../to-do-card/to-do-card.component';
import { AppService, TodoItem, ToDoStoreType } from '../app.service';

@Component({
  selector: 'app-todo-container',
  imports: [ToDoCardComponent],
  templateUrl: './todo-container.component.html',
  styleUrl: './todo-container.component.css'
})
export class TodoContainerComponent {
  todoList: TodoItem[] = [];

  constructor(appService: AppService) {
    appService.toDoStoreObs$.subscribe((data: ToDoStoreType) => {
      this.todoList = data.toDoList;
    });
  }
}
