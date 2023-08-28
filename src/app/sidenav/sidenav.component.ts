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
  navItems = navbarItems
  ngOnChanges() {
    // Ajustar el ancho del sidenav en función de la pantalla pequeña
    this.collapse = this.smallScreen ? true : this.collapse;
  }
  toggleCollapse() {
    this.collapse = !this.collapse;
    this.onToggleSidenav.emit({screenWidth: this.screenWidth, collapse: this.collapse, smallScreen: this.smallScreen});
  }
  closeSidenav() {
    this.collapse = false;
    this.onToggleSidenav.emit({screenWidth: this.screenWidth, collapse: this.collapse, smallScreen: this.smallScreen});
  }
}
