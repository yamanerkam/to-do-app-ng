import { Component, OnInit } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

import { DatePickerModule } from 'primeng/datepicker';
import { AppService, TodoItem, TodoStatus } from '../app.service';
import { TodoStatusLookUp } from '../shared/enums/todoStatusEnum';
import { MessageService } from 'primeng/api';

export type outputData = {
  triggerType: 'save' | 'cancel' | 'close';
  todoFormData: TodoItem;
};

@Component({
  selector: 'app-edit-app-to-do',
  imports: [ButtonModule, FormsModule, DatePickerModule, ReactiveFormsModule, DialogModule, SelectModule],
  templateUrl: './edit-add-to-do.component.html',
  styleUrl: './edit-add-to-do.component.css'
})
export class EditAddToDoComponent implements OnInit {
  displayEdit: boolean = false;
  headerName!: string;
  toDoForm!: FormGroup;

  statusOptions = TodoStatusLookUp;

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    public messageService: MessageService
  ) {
    this.toDoForm = this.fb.group({
      id: [null as string | null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: [null as TodoStatus | null, Validators.required],
      createdOn: [null as Date | null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.appService.todoFormVisObs$.subscribe((res) => {
      this.displayEdit = res;
      console.log(this.appService.currentTodoSub.value);
      this.headerName = this.appService.currentTodoSub.value?.id ? 'Edit' : 'Add';
      if (this.headerName == 'Edit') {
        this.toDoForm.patchValue(this.appService.currentTodoSub.getValue() ?? {});
      }
    });
  }

  closeDialog() {
    this.appService.todoFormToggler('close');
  }

  saveHandler() {
    const typeOfAction = this.toDoForm.value.id ? 'edit' : 'add';
    console.log(typeOfAction);
    const todoItemDTO: TodoItem = {
      ...this.toDoForm.value,
      id: this.toDoForm.value.id ?? Math.floor(Math.random() * 1000).toString()
    };

    // current todo edit or add make this two work together
    if (typeOfAction == 'edit') {
      this.appService.updateToDo(this.toDoForm.value.id, todoItemDTO).subscribe((res) => {
        this.appService.todoFormToggler('close');
      });
    } else {
      this.appService.addToDo(todoItemDTO).subscribe((res) => {
        this.appService.todoFormToggler('close');
      });
    }

    this.messageService.add({
      severity: 'success',
      summary: 'BASARILI',
      detail: `${this.headerName.toLocaleUpperCase()} islemi basarili!`
    });

    this.toDoForm.reset();
  }

  invalidFieldChecker(fieldName: string) {
    if (this.toDoForm.get(fieldName)?.invalid && this.toDoForm.get(fieldName)?.dirty) {
      return true;
    } else {
      return false;
    }
  }

  invalidFieldMessage(fieldName: string): string {
    return `Where is the ${fieldName}???`;
  }
}
