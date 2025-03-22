import { Component, EventEmitter, Input, Output } from "@angular/core";

import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";

import { ButtonModule } from "primeng/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CalendarModule } from "primeng/calendar";
import { TodoItem } from "../to-do-card/to-do-card.component";

@Component({
  selector: "app-edit-app-to-do",
  imports: [
    ButtonModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    DialogModule,
  ],
  templateUrl: "./edit-add-to-do.component.html",
  styleUrl: "./edit-add-to-do.component.css",
})
export class EditAddToDoComponent {
  @Input({ required: true }) todo!: TodoItem;
  @Input({ required: true }) displayEdit: boolean = false;

  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();

  saveHandler(triggerType: "save" | "cancel") {
    this.closeDialog.emit(triggerType == "save");
    // if (triggerType == "save") {
    //   this.closeDialog.emit(true);
    // } else {
    //   this.closeDialog.emit(false);
    // }

    // triggerType == "save"
    //   ? this.closeDialog.emit(true)
    //   : this.closeDialog.emit(false);
  }
}
