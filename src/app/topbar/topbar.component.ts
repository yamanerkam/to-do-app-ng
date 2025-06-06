import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
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
  ngOnInit(): void {}

  constructor(private appService: AppService) {}

  addNewTask() {
    this.appService.todoFormToggler('add');
  }
}
