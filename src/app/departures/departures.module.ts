import {DeparturesComponent} from "./departures.component";
import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import { MatPaginatorModule } from '@angular/material/paginator';

const departuresRoutes: Route[] = [
  {
    path: '',
    component: DeparturesComponent
  }
]

@NgModule({
  declarations: [
    DeparturesComponent,
  ],
  exports: [
    DeparturesComponent
  ],
  imports: [
    RouterModule.forChild(departuresRoutes),
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})

export class DeparturesModule
{
}
