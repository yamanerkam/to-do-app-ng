import { Component, Input } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { CalendarModule } from "primeng/calendar";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-topbar",
  imports: [
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

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  confirmAdd() {
    this.confirmationService.confirm({
      message: "Are you sure you want to add this task?",
      header: "Confirm Add",
      icon: "pi pi-times-circle",
      accept: () => {
        console.log("added");
        this.addNewTask();
      },
    });
  }

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
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Islem basariyla tamamlandi.",
      life: 3000,
    });
  }
}
