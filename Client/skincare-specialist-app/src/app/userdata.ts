import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Userdata {
  activeProduct = undefined;

  reset() {
    this.activeProduct = undefined; 
  }
}
