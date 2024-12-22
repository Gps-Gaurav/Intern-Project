import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { DeleteModel } from 'src/app/core/models/delete.model';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { MenuItem } from 'src/app/layouts/sidebar/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class MenuComponent implements OnInit {
    breadCrumbItems: Array<{}>;
  productDialog: boolean;
  Delete:"Delete";
  items: MenuItem[];
  submit: boolean;
  item: MenuItem;

  selectedItems: MenuItem[];

  submitted: boolean;

  get form() {
    return this.formData.controls;
  }

  formData: FormGroup;


  constructor(public formBuilder: FormBuilder,private  service:ResourceService<any>, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'MASTER' }, { label: 'BRANCH MASTER', active: true }];
    this.formData = this.formBuilder.group({
        // ID: ['', [Validators.required]],
      
        label: ['', [Validators.required]],
        link: ['', [Validators.required]],
      
       
        
      });
   this. _fetchData();
  }

  private _fetchData() { 
    let requestModel = <RequestModel>{};
    requestModel.spName="sp_app_get_menurole";
    
    this.service.GetApiJson(requestModel).subscribe(response => {
      this.items = JSON.parse(response.items);
     
    });   
  }





  openNew() {
    this.item = {};
    this.submitted = false;
    this.productDialog = true;
}

deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {

          let requestModel = <DeleteModel>{};
          requestModel.table_name="tbl_menu";
          requestModel.column_name="id";
          requestModel.column_value=this.selectedItems.map(a=>a.id).toString();
          this.service.MultiDeleteApiJson(requestModel).subscribe(response => {
          console.log("delete",response);
          this.items = this.items.filter(val => !this.selectedItems.includes(val));
          this.selectedItems = null;
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
    });   

       
        }
    });
}

editProduct(data: MenuItem) {
    this.item = {...data};
    this.productDialog = true;
}

deleteProduct(data: MenuItem) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + data.isTitle + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          let requestModel = <DeleteModel>{};
          requestModel.table_name="tbl_menu";
          requestModel.column_name="id";
          requestModel.column_value=data.id.toString();
          this.service.DeleteApiJson(requestModel).subscribe(response => {
          console.log("delete",response);
          this.items = this.items.filter(val => val.id !== data.id);
          this.item = {};
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
    });   
          
        }
    });
}

hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}

saveItem() {
    this.submitted = true;

    if (this.item.label.trim()) {
        if (this.item.id) {
            this.items[this.findIndexById((this.item.id.toString()))] = this.item;                
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        }
        else {
            // this.item.id = this.createId();
            this.item.icon = 'product-placeholder.svg';
            this.items.push(this.item);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        }

        this.items = [...this.items];
        this.productDialog = false;
        this.item = {};
    }
}

findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.items.length; i++) {
        // if (this.items[i].id === id) {
        //     index = i;
        //     break;
        // }
    }

    return index;
}

createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

validSubmit() {
    const controls = this.formData.controls;
    this.submit = true;

    if (this.formData.valid) {
      let request: MenuItem = <MenuItem>{};

     
      request.label = this.formData.get('label').value;//
      request.link = this.formData.get('link').value;//
    

      let jsonData: MenuItem[] = [];
      jsonData.push(request);
      let postrequest: RequestModel = <RequestModel>{};

      postrequest.spName = "sp_ui_admin_add_SubCateMast_json";
      postrequest.jsnData = JSON.stringify(jsonData);
      this.service.PostApiJson(postrequest).subscribe(Response => { })

      console.log("post product", request);//


    }
}

}
