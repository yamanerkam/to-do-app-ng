import { Component, Input } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { CalendarModule } from "primeng/calendar";

@Component({
  selector: "app-topbar",
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    CalendarModule,
  ],
  templateUrl: "./topbar.component.html",
  styleUrl: "./topbar.component.css",
})
export class TopbarComponent {
  @Input() searchText: string = "";
  displayAddDialog = false;

  newTitle = "";
  newDescription = "";
  newStatus = "";
  newDate: Date = new Date();

  addNewTask() {
    console.log("New Task:", {
      title: this.newTitle,
      description: this.newDescription,
      status: this.newStatus,
      createdOn: this.newDate,
    });

    this.displayAddDialog = false;

    this.newTitle = "";
    this.newDescription = "";
    this.newStatus = "";
    this.newDate = new Date();
  }
}
