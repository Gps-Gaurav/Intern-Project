import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  NewArrivalData : any[] =[];
  CategoryData : any[] =[];
  carouselData : any[] =[];
  bannerData : any[] =[];
  storiesData : any[] =[];
  featuredData : any[] =[];


ngOnInit(): void {
  this._fetchCategory();
  this._fetchNewArrival();
  this._fetchcarousel();
  this._fetchbanner();
  this._fetchstories();
  this._fetchfeatured();
  
}

constructor(private router: Router, private  service:ResourceService<any>) {
   
}

private _fetchNewArrival() { 
  let requestModel = <RequestModel>{};
  requestModel.spName="sp_ui_get_new_arrival";
  requestModel.pageNo=0;
  requestModel.pageSize=0;
  requestModel.search="";
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.NewArrivalData = JSON.parse(response.items);
   
  });   
}
private _fetchCategory() { 
  let requestModel = <RequestModel>{};
  requestModel.spName="sp_ui_get_HomeCategory";
  requestModel.pageNo=0;
  requestModel.pageSize=0;
  requestModel.search="";
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.CategoryData = JSON.parse(response.items);
   
  });   
}
private _fetchcarousel() { 
  let requestModel = <RequestModel>{};
  requestModel.spName="sp_ui_get_Homecarousel";
  requestModel.pageNo=0;
  requestModel.pageSize=0;
  requestModel.search="";
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.carouselData = JSON.parse(response.items);
   
  });   
}
private _fetchbanner() { 
  let requestModel = <RequestModel>{};
  requestModel.spName="sp_ui_get_Homebanner";
  requestModel.pageNo=0;
  requestModel.pageSize=0;
  requestModel.search="";
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.bannerData = JSON.parse(response.items);
   
  });   
}
private _fetchfeatured() { 
  let requestModel = <RequestModel>{};
  requestModel.spName="sp_ui_get_HomeFeaturedProduct";
  requestModel.pageNo=0;
  requestModel.pageSize=0;
  requestModel.search="";
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.featuredData = JSON.parse(response.items);
   
  });   
}
private _fetchstories() { 
  let requestModel = <RequestModel>{};
  requestModel.spName="sp_ui_get_HomeStories";
  requestModel.pageNo=0;
  requestModel.pageSize=0;
  requestModel.search="";
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.storiesData = JSON.parse(response.items);
   
  });   
}
}
