import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxjsService {

observableExample$ = new Observable(observer=>{
  observer.next('1')
  observer.next('2')
  observer.next('3')
  observer.next(Math.random())

  observer.complete()
});

dataSubject = new BehaviorSubject<number>(88);
data$ = this.dataSubject.asObservable();

constructor() {
this.data$.subscribe(val=>{
  console.log(val)
})

setTimeout(()=>{
  this.dataSubject.next(55)
},5000)


  // this.subjectExample.subscribe(value => {
  //   console.log('Received value:', value);
  // });
  // this.subjectExample.next(390);
  // this.subjectExample.next(391);

}

}
