import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  data = {
      geo: [],
      text: [],
      hash: undefined
  };
  addGeo (geo) {
    this.data.geo.push(geo);
  }
  addText (text) {
    this.data.text.push(text);
  }
  addHash (hash) {
    this.data.hash = hash;
  }


}
