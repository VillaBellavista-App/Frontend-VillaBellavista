import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutes } from "./app-routing.module";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { SidenavComponent } from './sidenav/sidenav.component';
import { BodyComponent } from './body/body.component';
import {AdminLayoutComponent} from "./layouts/admin/admin-layout.component";
import {HostListener} from "@angular/core";
import { DepartureDialogComponent } from './departure-dialog/departure-dialog.component';
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {FlexModule} from "@angular/flex-layout";
import { DriverDialogComponent } from './driver-dialog/driver-dialog.component';
import { VehicleDialogComponent } from './vehicle-dialog/vehicle-dialog.component';
import {MatSortModule} from "@angular/material/sort";
@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    BodyComponent,
    AdminLayoutComponent,
    DepartureDialogComponent,
    DriverDialogComponent,
    VehicleDialogComponent,
  ],
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatButtonModule,
        MatTableModule,
        FormsModule,
        MatDialogModule,
        FlexModule,
        MatSortModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
