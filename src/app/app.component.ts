import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TopbarComponent } from './topbar/topbar.component';

// genel yaklasim
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TodoContainerComponent } from './todo-container/todo-container.component';
import { AppService } from './app.service';
import { combineLatest, forkJoin, Subject } from 'rxjs';

import { TwoObserablesService } from './services/two-obserables.service';
import { FormEditAddToDoComponent } from './form-edit-add-to-do/form-edit-add-to-do.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, TopbarComponent, ConfirmDialogModule, ToastModule, TodoContainerComponent, FormEditAddToDoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  appService = inject(AppService);
  obsService = inject(TwoObserablesService);

  subjectExample2 = new Subject<number>();

  title = 'to-do-app-ng';

  ngOnInit(): void {
    this.appService.getTodos().subscribe();

    // combineLatest([this.obsService.obs1$, this.obsService.obs2$]).subscribe(([value1, value2]) => {
    //   console.log('combineLatest');
    //   console.log('Subject 1 emitted:', value1);
    //   console.log('Subject 2 emitted:', value2);
    //   console.log('///////////////////////////////////');
    // });

    // forkJoin([this.obsService.obs1$, this.obsService.obs2$]).subscribe(([value1, value2]) => {
    //   console.log('forkJoin');
    //   console.log('Subject 1 emitted:', value1);
    //   console.log('Subject 2 emitted:', value2);
    //   console.log('///////////////////////////////////');
    // });

    // this.obsService.subject1.next('A');
    // this.obsService.subject2.next(1);
  }
}
