import { Component, Input, OnInit } from "@angular/core";
import { CardModule } from "primeng/card";

import { DatePipe } from "@angular/common";
// sadece date pipe ile isimi cozdum

// import { CommonModule } from "@angular/common"; => common mudlu agir bir modul ve her componinta bunu eklemeye gerek yok sadece gerekli directiveleri ve pipeleri ayri olarak import edebiliriz
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { FormsModule } from "@angular/forms";
import { CalendarModule } from "primeng/calendar";

import { EditAddToDoComponent, outputData } from "../edit-add-to-do/edit-add-to-do.component";
import { SingletonService } from "../services/singleton.service";
import { NonSingletonService } from "../services/non-singleton.service";
import { AppService, TodoItem } from "../app.service";



@Component({
  selector: "app-to-do-card",
  imports: [
    CardModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    FormsModule,
    CalendarModule,
    DatePipe,
    EditAddToDoComponent,
  ],
  standalone: true,
  templateUrl: "./to-do-card.component.html",
  styleUrl: "./to-do-card.component.css",
  providers:[NonSingletonService]
})
export class ToDoCardComponent implements OnInit{
  @Input() todo!: TodoItem;

  displayEdit = false;


  ngOnInit():void{
   // console.log(this.singletonService.randomID + ' from toDoCard singleton');
   // console.log(this.nonSingletonService.randomID + ' from toDoCard NON singleton');
  }

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private singletonService: SingletonService,
    private nonSingletonService: NonSingletonService,
    private appService: AppService
  ) {}

  confirmDelete() {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete this task?",
      header: "Confirm Delete",
      icon: "pi pi-exclamation-triangle",
      // accept: () => {
      //   const index = this.appService.todoList.findIndex(item =>item.id == this.todo.id)
        
      //   if(index > -1){
      //     this.appService.todoList.splice(index,1)
      //   }else{
      //     console.log('error')
      //   }
      // },
    });
  }

  openEdit() {
    this.displayEdit = true;
  }

  closeDialogHandler(data:outputData) {
    if (data.triggerType == "save") {

      // const index = this.appService.todoList.findIndex(item =>item.id == data.todoFormData.id)

      // if(index > -1){
      //   this.appService.todoList[index] = data.todoFormData;
      // }else{
      //   console.log('error')
      // }

      this.messageService.add({
        severity: "success",
        summary: "BASARILI",
        detail: "Islem basarili",
      });

    } else if (data.triggerType == "cancel") {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Islem iptal edildi",
      });
    }

    this.displayEdit = false;
  }
}
