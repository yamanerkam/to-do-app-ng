import { Component, Input } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { CalendarModule } from "primeng/calendar";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { EditAddToDoComponent } from "../edit-add-to-do/edit-add-to-do.component";

@Component({
  selector: "app-topbar",
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    CalendarModule,
    EditAddToDoComponent,
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

  todo = {
    id: 1,
    title: "Buy groceries",
    description: "Get milk, eggs, and bread",
    status: "Open",
    createdOn: new Date("2023-01-10"),
  };

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  // confirmAdd() {
  //   this.confirmationService.confirm({
  //     message: "Are you sure you want to add this task?",
  //     header: "Confirm Add",
  //     icon: "pi pi-times-circle",
  //     accept: () => {
  //       console.log("added");
  //       this.addNewTask();
  //     },
  //   });
  // }

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

  closeDialogHandler(isSaved: boolean) {
    console.log("fire");
    if (isSaved) {
      this.messageService.add({
        severity: "success",
        summary: "BASARILI",
        detail: "Islem basarili",
      });
    } else {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Islem iptal edildi SS",
      });
    }

    this.displayAddDialog = false;
  }
}
