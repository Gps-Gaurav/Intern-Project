import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TabService } from 'src/app/core/helpers/TabService';
import { DeleteModel } from 'src/app/core/models/delete.model';
import { PartyModel } from 'src/app/core/models/Party.model';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';

@Component({
  selector: 'app-category',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss'],
  providers: [MessageService,ConfirmationService,TabService]

})
export class PartyComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  productDialog: boolean;
  Delete: "Delete";
  items: PartyModel[];
  page: number = 1;
  pageSize: number = 10;
  item: PartyModel = <PartyModel>{};
  search: string = "";
  totalRecords: number = 0;
  selectedItems: PartyModel[];
  submitted: boolean;
  searchChanged: Subject<string> = new Subject<string>();
  term: any;
  selectedDoc:string="";
  GLTypeId:number=0;
  docTypeData: any[]=[];
  doctype:any;
  constructor(private router: Router, private service: ResourceService<any>, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.searchChanged
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(newText => {
        this.search = newText;
        this._fetchData();;
      });
  }


  ngOnInit(): void {
    let docdata=sessionStorage.getItem("partydoctype");
    let GlTypedata=sessionStorage.getItem("GLTypeId");
    if(docdata!=undefined && docdata!="" && GlTypedata!=undefined && Number(GlTypedata)>0){
      this.selectedDoc=docdata;
      this.GLTypeId= Number(GlTypedata);
      this.doctype={DocType:docdata};
      this._fetchData();
    }
  }
  public _fetchDoctype(event) { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_admin_GetPartyGlTypebyparty";
    requestModel.pageNo=1;
    requestModel.pageSize=10;
    requestModel.search=event.query;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.docTypeData = JSON.parse(response.items);
      
    });   
  }
  private _fetchData() {
    let requestModel = <RequestModel>{};
    requestModel.spName = "sp_admin_GetPartyMast";
    requestModel.pageNo = this.page;
    requestModel.pageSize = this.pageSize;
    requestModel.search = this.selectedDoc;
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.items = JSON.parse(response.items);
      this.totalRecords = response.totalCount;
    });
  }


  public handlePagination(paginationData): void {
    this.page = paginationData.page + 1;
    this._fetchData();
  }

  onSelect(event: any){
    console.log( event );
    this.selectedDoc=event.GLType;
    this.GLTypeId= Number(event.SlNo);
    this._fetchData();
  }

  openNew() {
    if(this.selectedDoc!=""){
      if(this.selectedDoc.includes("Control")){
        sessionStorage.setItem("partydoctype",this.selectedDoc);
        sessionStorage.setItem("GLTypeId",this.GLTypeId.toString());
        this.router.navigate(['/master/CREATE_PARTY_MASTER']);
      }
      else{
        sessionStorage.setItem("GLTypeId",this.GLTypeId.toString());
        sessionStorage.setItem("partydoctype",this.selectedDoc);
        this.router.navigate(['/master/CREATE_LEDGER_MASTER']);
        
      }
    
    }
    else{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Select Doc Type', life: 3000});
    }
   
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        let requestModel = <DeleteModel>{};
        requestModel.table_name = "AGLMast";
        requestModel.column_name = "GLCode";
        requestModel.column_value = this.selectedItems.map(a => a.GLCode).toString();
        this.service.MultiDeleteApiJson(requestModel).subscribe(response => {
          console.log("delete", response);
          this.items = this.items.filter(val => !this.selectedItems.includes(val));
          this.selectedItems = null;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        });


      }
    });
  }

  editProduct(data: PartyModel) {
    console.log("partydata",data)
  
    // this.item = {...data};
    this.productDialog = true;
    if(data.GlType>0){
      if(data.GlTypeName.includes("Control")){
        sessionStorage.setItem("partydoctype",data.GlTypeName);
        sessionStorage.setItem("GLTypeId",data.GlType.toString());
        this.router.navigate(['/master/CREATE_PARTY_MASTER', { id: data.GLCode }]);
      }
      else{
        sessionStorage.setItem("GLTypeId",data.GlType.toString());
        sessionStorage.setItem("partydoctype",data.GlTypeName);
        this.router.navigate(['/master/CREATE_LEDGER_MASTER', { id: data.GLCode }]);
       // this.router.navigate(['/master/CREATE_LEDGER_MASTER']);
        
      }
    
    }
    else{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Select Doc Type', life: 3000});
    }
  }

  deleteProduct(data: PartyModel) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data.GLCode + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let requestModel = <DeleteModel>{};
        requestModel.table_name = "AGLMast";
        requestModel.column_name = "GLCode";
        requestModel.column_value = data.GLCode.toString();
        this.service.DeleteApiJson(requestModel).subscribe(response => {
          console.log("delete", response);
          this.items = this.items.filter(val => val.GLCode !== data.GLCode);
          this.item = <PartyModel>{};
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        });

      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }



  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id.toString() === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
