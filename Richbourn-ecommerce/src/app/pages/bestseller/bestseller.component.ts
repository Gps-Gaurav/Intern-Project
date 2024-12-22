import { Component, OnInit } from '@angular/core';
import { Router } from 'express';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';

@Component({
  selector: 'app-bestseller',
  templateUrl: './bestseller.component.html',
  styleUrls: ['./bestseller.component.css']
})
export class BestsellerComponent implements OnInit {

 BestSellerData : any[] =[];


ngOnInit(): void {
  this._fetchCategory();
}

constructor(private router: Router, private  service:ResourceService<any>) {
   
}

private _fetchCategory() { 
  let requestModel = <RequestModel>{};
  requestModel.spName="sp_ui_get_new_arrival";
  requestModel.pageNo=0;
  requestModel.pageSize=0;
  requestModel.search="";
  this.service.GetApiJson(requestModel).subscribe(response => {
    this.BestSellerData = JSON.parse(response.items);
   
  });   
}
}

