import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwoObserablesService {
  subject1 = new BehaviorSubject<string>('');
  obs1$ = this.subject1.asObservable();

  subject2 = new BehaviorSubject<number>(0);
  obs2$ = this.subject2.asObservable();
}
