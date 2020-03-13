import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, filter, switchMap } from "rxjs/operators";

import { Album } from "./album.model";
// const localUrl = "assets/data/smartphone.json";

@Injectable({
  providedIn: "root"
})
export class PetShopService {
  constructor(public http: HttpClient) {}

  getPets() {
    return this.http
      .get<{ album: Album }>("https://jsonplaceholder.typicode.com/albums")
      .pipe(
        map(responseData => {
          const albumArray: Album[] = [];
          for (const item in responseData) {
            albumArray.push({ ...responseData[item] });
          }
          return albumArray;
        })
      );
  }
}

// http://localhost:8081/api/pets
// https://jsonplaceholder.typicode.com/albums
