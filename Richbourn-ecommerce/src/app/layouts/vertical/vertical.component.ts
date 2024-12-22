import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';


import { SIDEBAR_TYPE } from "../layouts.model";

@Component({
  selector: 'app-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss']
})

/**
 * Vertical component
 */
export class VerticalComponent implements OnInit, AfterViewInit {

  isCondensed = false;
  sidebartype: string;
  categoryData:any[]=[];
  categoryMenuData:any[]=[];

  constructor(private router: Router, private  service:ResourceService<any>) {
   
  }

  ngOnInit(): void {
    this._fetchCategory();
  }


  private _fetchCategory() { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_ui_get_category";
    requestModel.pageNo=0;
    requestModel.pageSize=0;
    requestModel.search="";
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.categoryData = JSON.parse(response.items);
      this.categoryMenuData = this.categoryData.reduce(function(a, e) {
     
        let estKey = (e['category_type']); 
      
        (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
        return a;
      }, {});
    });   
   

  }

  isMobile() {
    const ua = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua);
  }

  ngAfterViewInit() {
  }

  /**
   * on settings button clicked from topbar
   */
  onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
  }




}
