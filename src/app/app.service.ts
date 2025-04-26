import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { TodoStatusEnum } from './shared/enums/todoStatusEnum';

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  status: TodoStatusEnum;
  createdOn: Date;
}

export type ToDoStoreType = {
  toDoList: TodoItem[];
  toDoFormVisible: Boolean;
  currentToDo: TodoItem | undefined;
};

export type TodoStatus = TodoItem['status'];

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnInit {
  httpService = inject(HttpClient);

  toDoStore = new BehaviorSubject<ToDoStoreType>({ ...({} as ToDoStoreType), toDoFormVisible: false });

  toDoStoreObs$ = this.toDoStore.asObservable();

  // todoListSubject = new BehaviorSubject<TodoItem[]>([]);
  // todoListObs$ = this.todoListSubject.asObservable();

  // todoFormVisibleSub = new BehaviorSubject<boolean>(false);
  // todoFormVisObs$ = this.todoFormVisibleSub.asObservable();

  // currentTodoSub = new BehaviorSubject<TodoItem | undefined>(undefined);
  // currentTodoObs$ = this.currentTodoSub.asObservable();

  todoFormToggler(action: 'add' | 'edit' | 'close', todo?: TodoItem) {
    // this.currentTodoSub.next(action == 'edit' ? todo : undefined);
    // this.todoFormVisibleSub.next(action == 'add' || action == 'edit');

    this.toDoStore.next({
      ...this.toDoStore.getValue(),
      toDoFormVisible: action == 'add' || action == 'edit',
      currentToDo: action == 'edit' ? todo : undefined
    });
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

  getTodos(): Observable<TodoItem[]> {
    return this.httpService.get<TodoItem[]>('http://localhost:3000/todoList').pipe(
      map((res: TodoItem[]) => {
        const currentStore = this.toDoStore.getValue();
        this.toDoStore.next({ ...currentStore, toDoList: res });
        return res;
      }),
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  deleteToDo(todoID: string): Observable<void> {
    return this.httpService.delete<void>(`http://localhost:3000/todoList/${todoID}`).pipe(
      tap(() => {
        const currentStore = this.toDoStore.getValue();
        const updatedList = currentStore.toDoList.filter((todo) => todo.id !== todoID);
        this.toDoStore.next({ ...currentStore, toDoList: updatedList });
      }),
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  addToDo(todo: TodoItem): Observable<TodoItem> {
    return this.httpService.post<TodoItem>('http://localhost:3000/todoList', todo).pipe(
      tap((newTodo) => {
        const currentStore = this.toDoStore.getValue();
        this.toDoStore.next({ ...currentStore, toDoList: [...currentStore.toDoList, newTodo] });
      }),
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  updateToDo(todoID: string, updatedTodo: TodoItem): Observable<TodoItem> {
    return this.httpService.put<TodoItem>(`http://localhost:3000/todoList/${todoID}`, updatedTodo).pipe(
      tap((res) => {
        const currentStore = this.toDoStore.getValue();
        const updatedList = currentStore.toDoList.map((todo) => (todo.id === todoID ? res : todo));
        this.toDoStore.next({ ...currentStore, toDoList: updatedList });
      }),
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  constructor() {}

  ngOnInit(): void {}
}
