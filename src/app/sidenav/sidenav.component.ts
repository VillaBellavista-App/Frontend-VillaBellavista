import {Component, EventEmitter, Output} from '@angular/core';
import {navbarItems} from "./nav-items";
interface SidenavToggle{
  screenWidth: number;
  collapse: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Output() onToggleSidenav: EventEmitter<SidenavToggle>=new EventEmitter();
  screenWidth=0;

  collapse = false;
  navItems = navbarItems
  toggleCollapse() {
    this.collapse = !this.collapse;
    this.onToggleSidenav.emit({screenWidth: this.screenWidth, collapse: this.collapse});
  }
  closeSidenav() {
    this.collapse = false;
    this.onToggleSidenav.emit({screenWidth: this.screenWidth, collapse: this.collapse});
  }
}
