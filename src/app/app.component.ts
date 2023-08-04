import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Villa Bellavista';
  sideNavUse= false;
  constructor(private router:Router,private activatedRoute:ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.url.subscribe(url => {
      let urlPath = url[0].path;
      console.log('url path:', urlPath);
    });
  }
}

//if(routePart!='login'){
//         this.sideNavUse=true;
//       }
