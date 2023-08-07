import {DriversComponent} from "./drivers.component";
import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {NgClass, NgIf} from "@angular/common";

const driversRoutes: Route[] = [
  {
    path: '',
    component: DriversComponent
  }
]

@NgModule({
  declarations: [
    DriversComponent,
  ],
  exports: [
    DriversComponent
  ],
  imports: [
    RouterModule.forChild(driversRoutes),
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    NgIf,
    NgClass,
  ]
})

export class DriversModule
{
}
