import { Component, HostListener, OnInit } from '@angular/core';

interface SidenavToggle {
  screenWidth: number;
  collapse: boolean;
  smallScreen: boolean; // Nuevo campo para identificar si es una pantalla pequeña
}

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SidenavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapse;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;

    const smallScreen = this.screenWidth < 400;
    this.onToggleSideNav({
      screenWidth: this.screenWidth,
      collapse: this.isSideNavCollapsed,
      smallScreen: smallScreen
    });
  }

  constructor() {}

  ngOnInit(): void {}
}
