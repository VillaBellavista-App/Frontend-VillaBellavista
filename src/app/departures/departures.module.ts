import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'; // Import MatSortModule

import { DeparturesComponent } from './departures.component';
import {NgClass, NgIf} from "@angular/common";

const departuresRoutes: Route[] = [
  {
    path: '',
    component: DeparturesComponent
  }
];

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
    MatSortModule,
    NgClass,
    NgIf,
    // Include MatSortModule
  ]
})
export class DeparturesModule {}
