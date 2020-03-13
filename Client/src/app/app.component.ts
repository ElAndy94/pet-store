import { Component, OnInit } from "@angular/core";

import { PetShopService } from "./app.service";
import { Album } from "./album.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title: string = "pet-store";
  pets: Album[] = [];

  constructor(public petServices: PetShopService) {}

  ngOnInit() {
    this.petServices.getPets().subscribe(items => {
      console.log(items);
      this.pets = items;
    });
  }
}
