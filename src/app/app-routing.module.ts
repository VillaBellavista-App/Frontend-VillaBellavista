import { Routes } from "@angular/router";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {AdminLayoutComponent} from "./layouts/admin/admin-layout.component";

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '',
    children: [{
      path: 'login',
      loadChildren: () => import('src/app/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'register',
        loadChildren: () => import('src/app/register/register.module').then(m => m.RegisterModule)
    }
  ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: 'departures',
      loadChildren: () => import('src/app/departures/departures.module').then(m => m.DeparturesModule)
    },
      {
        path: 'drivers',
        loadChildren: () => import('src/app/drivers/drivers.module').then(m => m.DriversModule)
      },
      {
        path: 'vehicles',
        loadChildren: () => import('src/app/vehicles/vehicles.module').then(m => m.VehiclesModule)
      },
      {
        path: 'graphics',
        loadChildren: () => import('src/app/graphics/graphics.module').then(m => m.GraphicsModule)
      }
    ]
  },
];
