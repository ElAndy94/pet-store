import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
// import { MatMenuModule } from "@angular/material/menu";
// import { MatToolbarModule } from "@angular/material/toolbar";
// import { MatIcon } from "@angular/material/icon";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule
    // MatToolbarModule,
    // MatIcon
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
