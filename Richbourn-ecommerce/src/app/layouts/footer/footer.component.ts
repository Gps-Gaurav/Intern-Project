import { Component, OnInit } from '@angular/core';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

/**
 * Footer component
 */
export class FooterComponent implements OnInit {

  // set the currenr year
  year: number = new Date().getFullYear();
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
