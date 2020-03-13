import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, filter, switchMap } from "rxjs/operators";

import { Pet } from "./pet.model";

@Injectable({
  providedIn: "root"
})
export class PetShopService {
  constructor(public http: HttpClient) {}

  getPets() {
    return this.http.get<{ pet: Pet }>("http://127.0.0.1:8081/api/pets").pipe(
      map(responseData => {
        console.log(responseData);
        const petArray: Pet[] = [];
        for (const item in responseData) {
          petArray.push({ ...responseData[item] });
        }
        return petArray;
      })
    );
  }
}
