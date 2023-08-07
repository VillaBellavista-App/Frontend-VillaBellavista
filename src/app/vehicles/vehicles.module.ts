import {VehiclesComponent} from "./vehicles.component";
import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {NgClass, NgIf} from "@angular/common";

const vehiclesRoutes: Route[] = [
  {
    path: '',
    component: VehiclesComponent
  }
]

@NgModule({
  declarations: [
    VehiclesComponent,
  ],
  exports: [
    VehiclesComponent
  ],
  imports: [
    RouterModule.forChild(vehiclesRoutes),
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    NgIf,
    NgClass,
  ]
})

export class VehiclesModule
{
}
