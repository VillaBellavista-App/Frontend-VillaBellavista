import {Component, EventEmitter, Input, Output} from '@angular/core';
import {navbarItems} from "./nav-items";

interface SidenavToggle{
  screenWidth: number;
  collapse: boolean;
  smallScreen: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent {
  @Input() smallScreen = false;
  @Output() onToggleSidenav: EventEmitter<SidenavToggle>=new EventEmitter();
  screenWidth=0;

  collapse = false;
  navItems = navbarItems;
  filteredNavbarItems: typeof navbarItems;
  user_role = localStorage.getItem('user');
  
  ngOnChanges() {
    // Ajustar el ancho del sidenav en función de la pantalla pequeña
    this.collapse = this.smallScreen ? true : this.collapse;
  }

  constructor() {
    this.filteredNavbarItems = this.getFilteredNavbarItems();
  }

  toggleCollapse() {
    this.collapse = !this.collapse;
    this.onToggleSidenav.emit({screenWidth: this.screenWidth, collapse: this.collapse, smallScreen: this.smallScreen});
  }
  
  closeSidenav() {
    this.collapse = false;
    this.onToggleSidenav.emit({screenWidth: this.screenWidth, collapse: this.collapse, smallScreen: this.smallScreen});
  }

  getFilteredNavbarItems() {
    if (this.user_role == '1') {
      // Si es Administrador, mostrar todos los elementos
      return navbarItems;
      
    } else if (this.user_role == '2') {
      // Si es Secretaria, filtrar elementos no permitidos
      return navbarItems.filter(item => {
        return !['drivers', 'vehicles', 'graphics'].includes(item.routerLink);
      });
    } else {
      // Otros roles podrían tener su propia lógica de filtrado aquí
      return [];
    }
  }
}
