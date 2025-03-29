import { Injectable } from '@angular/core';
import { TodoItem } from './to-do-card/to-do-card.component';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  todoList: TodoItem[] = [
    {
      id: '1',
      title: "Buy groceries",
      description: "Get milk, eggs, and bread",
      status: "Open",
      createdOn: new Date("2023-01-10"),
    },
    {
      id: '2',
      title: "Walk the dog",
      description: "Take Fido around the block for 15 minutes",
      status: "In Progress",
      createdOn: new Date("2023-02-14"),
    },
    {
      id: '3',
      title: "Send invoices",
      description: "Email all outstanding invoices",
      status: "Done",
      createdOn: new Date("2023-03-05"),
    },
    {
      id: '4',
      title: "Send invoices",
      description: "Email all outstanding invoices",
      status: "Done",
      createdOn: new Date("2023-03-05"),
    },
    {
      id: '5',
      title: "Send invoices",
      description: "Email all outstanding invoices",
      status: "Done",
      createdOn: new Date("2023-03-05"),
    },
    {
      id: '6',
      title: "Send invoices",
      description: "Email all outstanding invoices",
      status: "Done",
      createdOn: new Date("2023-03-05"),
    },
  ];
  constructor() { }
}
