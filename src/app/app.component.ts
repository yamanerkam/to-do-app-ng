import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";

// import { CommonModule } from "@angular/common";
// ngFor module yeterli
import { TopbarComponent } from "./topbar/topbar.component";

// genel yaklasim
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { TodoTableComponent } from "./app-todo-table/app-todo-table.component";
import { TodoContainerComponent } from "./todo-container/todo-container.component";
import { AppService } from "./app.service";
import { RxjsService } from "./services/rxjs.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-root",
  imports: [
    FormsModule,
    // ask about NgFor Import
    TopbarComponent,
    ConfirmDialogModule,
    ToastModule,
    TodoTableComponent,
    TodoContainerComponent
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  appService = inject(AppService)
  rxjsService = inject(RxjsService)

  subjectExample2 = new Subject<number>();

  title = "to-do-app-ng";
  todoLength = ''
  searchText = "";




  ngOnInit(): void {

      this.appService.getTodos().subscribe()
    // this.rxjsService.observableExample$.subscribe(data=>console.log(data))


    // this.subjectExample2.subscribe(val => console.log('A:', val));
    // this.subjectExample2.subscribe(val => console.log('B:', val));
    // this.subjectExample2.next(33)


    // this.rxjsService.subjectExample.subscribe(val => console.log('A:', val));
    // this.rxjsService.subjectExample.subscribe(val => console.log('B:', val));
    // this.rxjsService.subjectExample.next(4444)


  }








}
