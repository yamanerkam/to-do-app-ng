import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";

import { DialogModule } from "primeng/dialog";
import { SelectModule } from 'primeng/select';
import { ButtonModule } from "primeng/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormGroup, FormControl } from "@angular/forms";

import { DatePickerModule } from "primeng/datepicker";
import { TodoItem, TodoStatus } from "../app.service";

export type outputData = {
  triggerType: 'save' | 'cancel' | 'close',
  todoFormData: TodoItem
}

@Component({
  selector: "app-edit-app-to-do",
  imports: [
    ButtonModule,
    FormsModule,
    DatePickerModule,
    ReactiveFormsModule,
    DialogModule,
    SelectModule
  ],
  templateUrl: "./edit-add-to-do.component.html",
  styleUrl: "./edit-add-to-do.component.css",
})


export class EditAddToDoComponent implements OnInit, OnChanges {

  @Input() todo!: TodoItem;
  @Input({ required: true }) displayEdit: boolean = false;
  @Input({ required: true }) actionType!: "edit" | "add";

  @Output() closeDialog: EventEmitter<outputData> = new EventEmitter();

  headerName!: string;

  toDoForm = new FormGroup({
    id: new FormControl<string | null>(null),
    title: new FormControl(""),
    description: new FormControl(""),
    status: new FormControl<TodoStatus | null>(null),
    createdOn: new FormControl<Date | null>(null),
  });

  statusOptions = [
    'In Progress',
    'Done',
    'Not Started'
  ];

  ngOnInit(): void {
    console.log('on init')
    this.headerName = this.actionType == "edit" ? "Edit" : "Add";
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes')
    if (this.todo) {
      this.toDoForm.patchValue({ ...this.todo })
      // this.toDoForm.patchValue({
      //   title:this.todo.title
      //   // // 
      // }) 
    }
    // ??????? performance
  }

  saveHandler(triggerType?: "save" | "cancel" | "close") {

    const data: outputData = {
      triggerType: triggerType ?? 'cancel',
      todoFormData: {
        ...this.toDoForm.getRawValue(), id: this.toDoForm.getRawValue().id || Math.random().toString()
      } as TodoItem
    }

    this.closeDialog.emit(data);
    this.toDoForm.reset();
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
