import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, filter, switchMap } from "rxjs/operators";

// const localUrl = "assets/data/smartphone.json";

@Injectable({
  providedIn: "root"
})
export class PetShopService {
  pets;
  petsUpdated;
  constructor(public http: HttpClient) {}

  getPets() {
    // http://localhost:8081/api/pets
    // https://jsonplaceholder.typicode.com/albums
    return this.http
      .get("https://jsonplaceholder.typicode.com/albums")
      .pipe(
        map(data => {
          console.log(data);
        })
      )
      .subscribe(transformedPets => {
        // this.pets = transformedpets;
        // console.log(this.pets);
        //console.log(transformedPets);
        //this.petsUpdated.next([...this.pets]);
      });
  }

  // getPetsUpdateListener() {
  //   return this.petsUpdated.asObservable();
  // }
}
