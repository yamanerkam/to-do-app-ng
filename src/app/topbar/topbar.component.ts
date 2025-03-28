import { Component, Inject, Input, OnInit } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { CalendarModule } from "primeng/calendar";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { EditAddToDoComponent } from "../edit-add-to-do/edit-add-to-do.component";
import { SingletonService } from "../services/singleton.service";
import { NonSingletonService } from "../services/non-singleton.service";

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
  providers:[NonSingletonService]
})
export class TopbarComponent implements OnInit {
// singletonService = Inject(SingletonService)
  
  @Input() searchText: string = "";
  displayAddDialog = false;

  newTitle = "";
  newDescription = "";
  newStatus = "";
  newDate: Date = new Date();


  ngOnInit(): void {
    console.log(this.singletonService.randomID + ' from topbar singleton');
    console.log(this.nonSingletonService.randomID + ' from topbar NON singleton');

  }

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private singletonService: SingletonService,
    private nonSingletonService: NonSingletonService
  ) {
  }

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

  closeDialogHandler(isSaved: string) {
    if (isSaved == "save") {
      this.messageService.add({
        severity: "success",
        summary: "BASARILI",
        detail: "Islem basarili",
      });
    } else if (isSaved == "cancel") {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Islem iptal edildi SS",
      });
    }

    this.displayAddDialog = false;
  }
}
