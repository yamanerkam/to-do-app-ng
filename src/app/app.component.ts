import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

// import { CommonModule } from "@angular/common";
// ngFor module yeterli
import { ToDoCardComponent } from "./to-do-card/to-do-card.component";
import { TopbarComponent } from "./topbar/topbar.component";

// genel yaklasim
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { TodoTableComponent } from "./app-todo-table/app-todo-table.component";
import { TodoContainerComponent } from "./todo-container/todo-container.component";

@Component({
  selector: "app-root",
  imports: [
    FormsModule,
    // ask about NgFor Import
    ToDoCardComponent,
    TopbarComponent,
    ConfirmDialogModule,
    ToastModule,
    TodoTableComponent,
    TodoContainerComponent
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "to-do-app-ng";

  searchText = "";
 








}
