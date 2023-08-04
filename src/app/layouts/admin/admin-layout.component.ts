import {Component,HostListener, OnInit} from '@angular/core';

interface SidenavToggle{
  screenWidth: number;
  collapse: boolean;
}
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  isSideNavCollapsed = false;
  screenWidth=0;
  onToggleSideNav(data: SidenavToggle) {
    this.screenWidth = data.screenWidth;
    //show in the console the values of the data received
    this.isSideNavCollapsed = data.collapse;
  }
  constructor() { }

  ngOnInit(): void {
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
    console.log('onResize', this.screenWidth);
  }

}
