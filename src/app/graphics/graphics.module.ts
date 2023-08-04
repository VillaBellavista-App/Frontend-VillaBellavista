import {GraphicsComponent} from "./graphics.component";
import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";

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
  ]
})

export class GraphicsModule
{
}
