import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

// import { CommonModule } from "@angular/common";
// ngFor module yeterli
import { TodoItem } from "./to-do-card/to-do-card.component";
import { ToDoCardComponent } from "./to-do-card/to-do-card.component";
import { TopbarComponent } from "./topbar/topbar.component";
import { NgFor } from "@angular/common";

// genel yaklasim
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";

@Component({
  selector: "app-root",
  imports: [
    FormsModule,
    // ask this
    NgFor,
    ToDoCardComponent,
    TopbarComponent,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "to-do-app-ng";

  searchText = "";
  todoList: TodoItem[] = [
    {
      id: 1,
      title: "Buy groceries",
      description: "Get milk, eggs, and bread",
      status: "Open",
      createdOn: new Date("2023-01-10"),
    },
    {
      id: 2,
      title: "Walk the dog",
      description: "Take Fido around the block for 15 minutes",
      status: "In Progress",
      createdOn: new Date("2023-02-14"),
    },
    {
      id: 3,
      title: "Send invoices",
      description: "Email all outstanding invoices",
      status: "Done",
      createdOn: new Date("2023-03-05"),
    },
    {
      id: 4,
      title: "Send invoices",
      description: "Email all outstanding invoices",
      status: "Done",
      createdOn: new Date("2023-03-05"),
    },
    {
      id: 5,
      title: "Send invoices",
      description: "Email all outstanding invoices",
      status: "Done",
      createdOn: new Date("2023-03-05"),
    },
    {
      id: 5,
      title: "Send invoices",
      description: "Email all outstanding invoices",
      status: "Done",
      createdOn: new Date("2023-03-05"),
    },
  ];
}
