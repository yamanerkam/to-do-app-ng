import { Component, Inject, Input, OnInit } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { CalendarModule } from "primeng/calendar";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { EditAddToDoComponent, outputData } from "../edit-add-to-do/edit-add-to-do.component";
import { SingletonService } from "../services/singleton.service";
import { NonSingletonService } from "../services/non-singleton.service";
import { AppService, TodoItem, TodoStatus } from "../app.service";

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
  newStatus : TodoStatus  | '' = "";
  newDate: Date = new Date();


  ngOnInit(): void {
   // console.log(this.singletonService.randomID + ' from topbar singleton');
   // console.log(this.nonSingletonService.randomID + ' from topbar NON singleton');

  }
 
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private singletonService: SingletonService,
    private nonSingletonService: NonSingletonService,
    private appService:AppService
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
    this.appService.todoFormToggler('add');
  }

  closeDialogHandler(data:outputData) {
    console.log(data)
    if (data.triggerType == "save") {

      // this.appService.addToDo(newTodo).subscribe({
      //   next: () => console.log('Added successfully'),
      //   error: err => alert(err.message)
      // });


      this.messageService.add({
        severity: "success",
        summary: "BASARILI",
        detail: "(add) Islem basarili",
      });
    } else if (data.triggerType == "cancel") {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Islem iptal edildi SS",
      });
    }

    this.displayAddDialog = false;
  }
}
