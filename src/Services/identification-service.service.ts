import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdentificationServiceService {

  constructor() { }

  docOfman: { username: string; password: string }[] = [
    { username: 'sarabo@gmail.com', password: 'GuideX1!' },
    { username: 'aaa@bbb.com', password: 'aaaAAA1!' },
    { username: 'bbb@ccc.ddd', password: 'bbbBBB1!' },
    { username: 'ccc@ddd.eee', password: 'cccCCC1!' }
  ];
  GetDocOfMan() : null | { username: string; password: string }[]
  {
    return this.docOfman;
  }

}
