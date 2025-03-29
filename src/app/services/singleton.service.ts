import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SingletonService {
  randomID = Math.random();

  constructor() {
    console.log('SingletonService created');
   }

  getRandomID(){
    return this.randomID;
  }
}
