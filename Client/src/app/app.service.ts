import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, filter, switchMap } from "rxjs/operators";

import { Album } from "./album.model";

@Injectable({
  providedIn: "root"
})
export class PetShopService {
  constructor(public http: HttpClient) {}

  getPets() {
    return this.http
      .get<{ album: Album }>("http://localhost:8081/api/pets")
      .pipe(
        map(responseData => {
          console.log(responseData);
          const albumArray: any[] = [];
          for (const item in responseData) {
            albumArray.push({ ...responseData[item] });
          }
          return albumArray;
        })
      );
  }
}

// https://jsonplaceholder.typicode.com/albums

// http://localhost:8081/api/pets
// https://jsonplaceholder.typicode.com/albums
