import { Component, OnInit } from "@angular/core";

import { PetShopService } from "./app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title: string = "pet-store";
  pets: any[] = [];

  constructor(public petServices: PetShopService) {}

  ngOnInit() {
    this.petServices.getPets().subscribe(items => {
      this.pets = items;
      // console.log(this.pets);
    });
  }
}
