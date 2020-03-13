import { Component, OnInit } from "@angular/core";

import { PetShopService } from "./app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "pet-store";
  pets;

  constructor(public petServices: PetShopService) {}

  ngOnInit() {
    this.pets = this.petServices.getPets();
    // console.log(this.pets);
  }
}
