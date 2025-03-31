import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";

import { DialogModule } from "primeng/dialog";
import { SelectModule } from 'primeng/select';
import { ButtonModule } from "primeng/button";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
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

  toDoForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.toDoForm = this.fb.group({

      id: [null as string | null],
      title: ["", Validators.required],
      description: ["", Validators.required],
      status: [null as TodoStatus | null, Validators.required],
      createdOn: [null as Date | null, Validators.required],

      // id: new FormControl<string | null>(null),
      // title: new FormControl(""),
      // description: new FormControl(""),
      // status: new FormControl<TodoStatus | null>(null),
      // createdOn: new FormControl<Date | null>(null),
    }
      // , { updateOn: 'blur' }
    )
  }
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
    //   console.log('Form Data:', this.toDoForm.value);

    //   if (this.toDoForm.valid) {
    //     console.log('Form is valid');
    //   } else {
    //     console.log('Form is invalid');
    //   }
    // 
  }

  invalidFieldChecker(fieldName: string) {
    if (this.toDoForm.get(fieldName)?.invalid && this.toDoForm.get(fieldName)?.dirty) {
      return true
    } else {
      return false
    }
  }

  invalidFieldMessage(fieldName: string): string {
    return `Where is the ${fieldName}???`;
  }
}
