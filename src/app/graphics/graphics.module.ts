import {GraphicsComponent} from "./graphics.component";
import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {NgChartsModule} from "ng2-charts";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {NgClass, NgIf} from "@angular/common";

const graphicsRoutes: Route[] = [
  {
    path: '',
    component: GraphicsComponent
  }
]

@NgModule({
  declarations: [
    GraphicsComponent,
  ],
  exports: [
    GraphicsComponent
  ],
  imports: [
    RouterModule.forChild(graphicsRoutes),
    NgChartsModule,
    MatPaginatorModule,
    MatTableModule,
    NgIf,
    NgClass,
  ]
})

export class GraphicsModule
{
}
