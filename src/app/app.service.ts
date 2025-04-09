import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Done'
  createdOn: Date;
}

export type TodoStatus = TodoItem['status'];

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnInit {
  httpService = inject(HttpClient)


  todoListSubject = new BehaviorSubject<TodoItem[]>([])
  todoListObs$ = this.todoListSubject.asObservable();


  getTodos():Observable<TodoItem[]>{
  return this.httpService.get<TodoItem[]>('http://localhost:3000/todoList').pipe(map((res:TodoItem[])=>{
    this.todoListSubject.next(res)
    return res;
  }),
  catchError((err)=>{
    throw new Error(err);
  })
  );
  }

  deleteToDo(todoID:string){
  }

  addToDo(todo:TodoItem){

  }

  updateToDo(todoID:string){

  }
  constructor() { }

  ngOnInit(): void {
  }

}
