import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { TodoStatusEnum } from './shared/enums/todoStatusEnum';

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  status: TodoStatusEnum 
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

  todoFormVisibleSub = new BehaviorSubject<boolean>(false);
  todoFormVisObs$ = this.todoFormVisibleSub.asObservable();

  currentTodoSub = new BehaviorSubject<TodoItem | undefined>(undefined);
  currentTodoObs$ = this.currentTodoSub.asObservable();

  todoFormToggler(action : 'add' | 'edit' | 'close',todo?:TodoItem){
    this.currentTodoSub.next(action == 'edit' ? todo : undefined)
    this.todoFormVisibleSub.next(action == 'add' || action == 'edit')
    // switch (action) {
    //   case 'add':
    //     this.todoFormVisibleSub.next(true);
    //     break;
    //   case 'edit':
    //     this.currentTodoSub.next(todo)
    //     this.todoFormVisibleSub.next(true);
    //     break;
    //   case 'close':
    //     this.currentTodoSub.next(undefined)
    //     this.todoFormVisibleSub.next(false)
    //     break;
    //   default:
    //     break;
    // }
  }


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

  deleteToDo(todoID:string) : Observable<void>{
   return this.httpService.delete<void>(`http://localhost:3000/todoList/${todoID}`).pipe(
      tap(() => {
        const currentList = this.todoListSubject.getValue();
        const updatedList = currentList.filter(todo => todo.id !== todoID);
        this.todoListSubject.next(updatedList);
      }),
      catchError((err) => {
        throw new Error(err);
      })
    )
  }

  addToDo(todo:TodoItem):Observable<TodoItem>{
    return this.httpService.post<TodoItem>('http://localhost:3000/todoList',todo).pipe(
      tap((newTodo) => {
        const currentList = this.todoListSubject.getValue();
        this.todoListSubject.next([...currentList, newTodo]);
      }),
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  updateToDo(todoID: string, updatedTodo: TodoItem): Observable<TodoItem> {
    return this.httpService.put<TodoItem>(`http://localhost:3000/todoList/${todoID}`, updatedTodo).pipe(
      tap((res) => {
        const currentList = this.todoListSubject.getValue();
        const updatedList = currentList.map(todo =>
          todo.id === todoID ? res : todo
        );
        this.todoListSubject.next(updatedList);
      }),
      catchError((err) => {
        throw new Error(err);
      })
    );
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
