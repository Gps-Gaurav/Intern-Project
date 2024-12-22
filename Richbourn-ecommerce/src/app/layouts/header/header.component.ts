import { Component, OnInit } from '@angular/core';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categoryData:any[]=[];
  categoryMenuData:any[]=[];
  
/**
 *
 */
constructor(private  service:ResourceService<any>) {
 

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
}
