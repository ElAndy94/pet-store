import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, filter, switchMap } from "rxjs/operators";

// const localUrl = "assets/data/smartphone.json";

@Injectable({
  providedIn: "root"
})
export class PetShopService {
  constructor(public http: HttpClient) {}

  getPets() {
    return this.http.get("https://jsonplaceholder.typicode.com/albums").pipe(
      map(responseData => {
        const albumArray: any[] = [];
        for (const item in responseData) {
          albumArray.push({ ...responseData[item] });
        }
        return albumArray;
      })
    );
  }

  // getPetsUpdateListener() {
  //   return this.petsUpdated.asObservable();
  // }
}

// http://localhost:8081/api/pets
// https://jsonplaceholder.typicode.com/albums
