import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Subject } from 'rxjs/Subject';
// import 'rxjs/add/operator/map';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable()
export class PetShopService {
  
  constructor(private http: Http) {}

//   getData() {
//     this.http.get('http://localhost:8081/api/pets').map(
//         (response: Response) => response.json()
//     )
//     .subscribe(
//     (data) => {
//         console.log(data);
//     },
//     (error) => {
//         console.log(error);
//     }
//     );
//   }

getPosts() {
    this.http
      .get('http://localhost:8081/api/pets')
      .pipe(
        map(data => {
          return data.map(item => {
           console.log(item);
          });
        })
      )
}

}