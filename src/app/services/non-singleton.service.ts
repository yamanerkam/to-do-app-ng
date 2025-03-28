import { Injectable } from '@angular/core';

@Injectable()
export class NonSingletonService {
  randomID = Math.random();

  constructor() {
    console.log('NON SingletonService created');
   }

  getRandomID(){
    return this.randomID;
  }
}
