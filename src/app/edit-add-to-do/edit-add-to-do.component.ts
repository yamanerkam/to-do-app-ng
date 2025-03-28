import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";

import { ButtonModule } from "primeng/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormGroup, FormControl } from "@angular/forms";

import { DatePickerModule } from "primeng/datepicker";
import { TodoItem } from "../to-do-card/to-do-card.component";

@Component({
  selector: "app-edit-app-to-do",
  imports: [
    ButtonModule,
    FormsModule,
    DatePickerModule,
    ReactiveFormsModule,
    DialogModule,
  ],
  templateUrl: "./edit-add-to-do.component.html",
  styleUrl: "./edit-add-to-do.component.css",
})
export class EditAddToDoComponent implements OnInit {
  @Input() todo!: TodoItem;
  @Input({ required: true }) displayEdit: boolean = false;
  @Input({ required: true }) actionType!: "edit" | "add";

  @Output() closeDialog: EventEmitter<string> = new EventEmitter();

  headerName!: string;

  toDoForm = new FormGroup({
    title: new FormControl(""),
    description: new FormControl(""),
    status: new FormControl(""),
    createdOn: new FormControl<Date | null>(null),
  });

  ngOnInit(): void {
    this.headerName = this.actionType == "edit" ? "Edit" : "Add";

    if (this.todo) {
      this.toDoForm = new FormGroup({
        title: new FormControl(this.todo.title ?? ""),
        description: new FormControl(this.todo.description ?? ""),
        status: new FormControl(this.todo.status ?? ""),
        createdOn: new FormControl<Date | null>(this.todo.createdOn ?? null),
      });
    }
  }

  saveHandler(triggerType?: "save" | "cancel") {
    this.closeDialog.emit(triggerType);
    // this.closeDialog.emit(triggerType == "save");
    // if (triggerType == "save") {
    //   this.closeDialog.emit(true);
    // } else {
    //   this.closeDialog.emit(false);
    // }
    // triggerType == "save"
    //   ? this.closeDialog.emit(true)
    //   : this.closeDialog.emit(false);
  }

  onSubmit() {
    console.log(this.toDoForm.value);
  }
}
