import { Component, Inject, Input, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SingletonService } from '../services/singleton.service';
import { NonSingletonService } from '../services/non-singleton.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-topbar',
  imports: [FormsModule, InputTextModule, ButtonModule, DialogModule, CalendarModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
  providers: [NonSingletonService]
})
export class TopbarComponent implements OnInit {
  // singletonService = Inject(SingletonService)

  @Input() searchText: string = '';

  ngOnInit(): void {}

  constructor(private appService: AppService) {}

  addNewTask() {
    this.appService.todoFormToggler('add');
  }
}
