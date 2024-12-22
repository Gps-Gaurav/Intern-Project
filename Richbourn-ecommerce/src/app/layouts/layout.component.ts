import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit, AfterViewInit {

  // layout related config
  layoutType: string;
  layoutwidth: string;
  topbar: string;

  constructor() { }

  ngOnInit() {
    // default settings
   
  }

  ngAfterViewInit() {
  }

 
  
}
