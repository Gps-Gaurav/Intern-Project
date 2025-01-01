import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestModel } from 'src/app/core/models/request.model';
import { ResourceService } from 'src/app/core/services/resource.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TBL_HR_EMPLOYEE_MASTERModel } from './TBL_HR_EMPLOYEE_MASTER.model';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-TBL_HR_EMPLOYEE_MASTER',
  templateUrl: './TBL_HR_EMPLOYEE_MASTER.component.html',
  styleUrls: ['./TBL_HR_EMPLOYEE_MASTER.component.scss']
})

/**
 * Ecomerce Customers component
 */
export class TBL_HR_EMPLOYEE_MASTERComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  tableData: TBL_HR_EMPLOYEE_MASTERModel[];
  requestModel :RequestModel = <RequestModel>{};
  term: any;
  startIndex:number=0;
  endIndex:number=0;
  totalRecords:number=0;
  page:number=1;
  pageSize:number=10;
  total$: Observable<number>;
  // page
  currentpage: number;

  constructor(private modalService: NgbModal,private router: Router, private formBuilder: FormBuilder,private service:ResourceService<TBL_HR_EMPLOYEE_MASTERModel>,private toastr: ToastrService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'TBL_HR_EMPLOYEE_MASTER', active: true }];

    this.formData = this.formBuilder.group({
      ID: ['', [Validators.required]],
EmpCode: ['', [Validators.required]],
EmpName: ['', [Validators.required]],
Sex: ['', [Validators.required]],
Designation: ['', [Validators.required]],
PostedAtCode: ['', [Validators.required]],
PostedAtName: ['', [Validators.required]],
FatherName: ['', [Validators.required]],
Address1: ['', [Validators.required]],
Address2: ['', [Validators.required]],
City: ['', [Validators.required]],
Pin: ['', [Validators.required]],
State: ['', [Validators.required]],
casual: ['', [Validators.required]],
login: ['', [Validators.required]],
BankAcNo: ['', [Validators.required]],
BasicCurrent: ['', [Validators.required]],
HouseRentCurrent: ['', [Validators.required]],
ConveyenceCurrent: ['', [Validators.required]],
OtherCurrent: ['', [Validators.required]],
GrossCurrent: ['', [Validators.required]],
BasicPrevious: ['', [Validators.required]],
HouseRentPrevious: ['', [Validators.required]],
ConveyencePrevious: ['', [Validators.required]],
OtherPrevious: ['', [Validators.required]],
GrossPrevious: ['', [Validators.required]],
PayQuit: ['', [Validators.required]],
PFDeduct: ['', [Validators.required]],
VoluntaryPF: ['', [Validators.required]],
DateOfBirth: ['', [Validators.required]],
DateOfJoining: ['', [Validators.required]],
DateOfLeaving: ['', [Validators.required]],
GauranterName: ['', [Validators.required]],
GauranterAdd1: ['', [Validators.required]],
GauranterAdd2: ['', [Validators.required]],
GauranterCity: ['', [Validators.required]],
GauranterPin: ['', [Validators.required]],
GauranterState: ['', [Validators.required]],
UANNo: ['', [Validators.required]],
PFNo: ['', [Validators.required]],
ESINo: ['', [Validators.required]],
DutyTime: ['', [Validators.required]],
PANNo: ['', [Validators.required]],
ADHAARNo: ['', [Validators.required]],
OtherDetails: ['', [Validators.required]],
ImagePath: ['', [Validators.required]],
Imagename: ['', [Validators.required]],
LoginID: ['', [Validators.required]],
LPassword: ['', [Validators.required]],
InTime: ['', [Validators.required]],
OutTime: ['', [Validators.required]],
Etype: ['', [Validators.required]],
BAllocation: ['', [Validators.required]],

    });

    this.currentpage = 1;

    /**
     * Fetches the data
     */
    this._fetchData();
  }

  /**
   * Customers data fetches
   */
    /*
   private _fetchData() {
    this.requestModel.url = "SP/sp_get_list_TBL_HR_EMPLOYEE_MASTER?PageNo="+this.page+"&PageSize="+this.pageSize;
    this.service.getList(this.requestModel).subscribe(response => {
       this.tableData = response.document.records;
      this.totalRecords = response.totalCount;
      this.startIndex = (this.page - 1) * this.pageSize + 1;
      this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
      if (this.endIndex > this.totalRecords) {
          this.endIndex = this.totalRecords;
      }
      this.total$=new BehaviorSubject<number>(this.totalRecords)
    });
  }
    */
   private _fetchData() {
    this.requestModel.url = "TBL_HR_EMPLOYEE_MASTER";
    this.service.getList(this.page,this.pageSize,this.requestModel.url).subscribe(response => {
       this.tableData = response.document.records;
      this.totalRecords = response.document.totalRecords;
      this.startIndex = (this.page - 1) * this.pageSize + 1;
      this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
      if (this.endIndex > this.totalRecords) {
          this.endIndex = this.totalRecords;
      }
      this.total$=new BehaviorSubject<number>(this.totalRecords)
    });
  }

  loadPage(page: number) {
    console.log("pagechange",page)
    this.page=page;
    this._fetchData();
  }
  get form() {
    return this.formData.controls;
  }

  /**
   * Open modal
   * @param content modal content
   */
   openModal(content: any) {
    this.router.navigate(['/master/insert_TBL_HR_EMPLOYEE_MASTER']);
  }
  edit(data:TBL_HR_EMPLOYEE_MASTERModel,content: any){
     this.formData.controls['ID'].setValue(data.ID);
this.formData.controls['EmpCode'].setValue(data.EmpCode);
this.formData.controls['EmpName'].setValue(data.EmpName);
this.formData.controls['Sex'].setValue(data.Sex);
this.formData.controls['Designation'].setValue(data.Designation);
this.formData.controls['PostedAtCode'].setValue(data.PostedAtCode);
this.formData.controls['PostedAtName'].setValue(data.PostedAtName);
this.formData.controls['FatherName'].setValue(data.FatherName);
this.formData.controls['Address1'].setValue(data.Address1);
this.formData.controls['Address2'].setValue(data.Address2);
this.formData.controls['City'].setValue(data.City);
this.formData.controls['Pin'].setValue(data.Pin);
this.formData.controls['State'].setValue(data.State);
this.formData.controls['casual'].setValue(data.casual);
this.formData.controls['login'].setValue(data.login);
this.formData.controls['BankAcNo'].setValue(data.BankAcNo);
this.formData.controls['BasicCurrent'].setValue(data.BasicCurrent);
this.formData.controls['HouseRentCurrent'].setValue(data.HouseRentCurrent);
this.formData.controls['ConveyenceCurrent'].setValue(data.ConveyenceCurrent);
this.formData.controls['OtherCurrent'].setValue(data.OtherCurrent);
this.formData.controls['GrossCurrent'].setValue(data.GrossCurrent);
this.formData.controls['BasicPrevious'].setValue(data.BasicPrevious);
this.formData.controls['HouseRentPrevious'].setValue(data.HouseRentPrevious);
this.formData.controls['ConveyencePrevious'].setValue(data.ConveyencePrevious);
this.formData.controls['OtherPrevious'].setValue(data.OtherPrevious);
this.formData.controls['GrossPrevious'].setValue(data.GrossPrevious);
this.formData.controls['PayQuit'].setValue(data.PayQuit);
this.formData.controls['PFDeduct'].setValue(data.PFDeduct);
this.formData.controls['VoluntaryPF'].setValue(data.VoluntaryPF);
this.formData.controls['DateOfBirth'].setValue(data.DateOfBirth);
this.formData.controls['DateOfJoining'].setValue(data.DateOfJoining);
this.formData.controls['DateOfLeaving'].setValue(data.DateOfLeaving);
this.formData.controls['GauranterName'].setValue(data.GauranterName);
this.formData.controls['GauranterAdd1'].setValue(data.GauranterAdd1);
this.formData.controls['GauranterAdd2'].setValue(data.GauranterAdd2);
this.formData.controls['GauranterCity'].setValue(data.GauranterCity);
this.formData.controls['GauranterPin'].setValue(data.GauranterPin);
this.formData.controls['GauranterState'].setValue(data.GauranterState);
this.formData.controls['UANNo'].setValue(data.UANNo);
this.formData.controls['PFNo'].setValue(data.PFNo);
this.formData.controls['ESINo'].setValue(data.ESINo);
this.formData.controls['DutyTime'].setValue(data.DutyTime);
this.formData.controls['PANNo'].setValue(data.PANNo);
this.formData.controls['ADHAARNo'].setValue(data.ADHAARNo);
this.formData.controls['OtherDetails'].setValue(data.OtherDetails);
this.formData.controls['ImagePath'].setValue(data.ImagePath);
this.formData.controls['Imagename'].setValue(data.Imagename);
this.formData.controls['LoginID'].setValue(data.LoginID);
this.formData.controls['LPassword'].setValue(data.LPassword);
this.formData.controls['InTime'].setValue(data.InTime);
this.formData.controls['OutTime'].setValue(data.OutTime);
this.formData.controls['Etype'].setValue(data.Etype);
this.formData.controls['BAllocation'].setValue(data.BAllocation);

   
    this.modalService.open(content);
  }
  saveData() {
    const currentDate = new Date();
    if (this.formData.valid) {
      let request :TBL_HR_EMPLOYEE_MASTERModel = <TBL_HR_EMPLOYEE_MASTERModel>{};
request.ID = this.formData.get('ID').value;
request.EmpCode = this.formData.get('EmpCode').value;
request.EmpName = this.formData.get('EmpName').value;
request.Sex = this.formData.get('Sex').value;
request.Designation = this.formData.get('Designation').value;
request.PostedAtCode = this.formData.get('PostedAtCode').value;
request.PostedAtName = this.formData.get('PostedAtName').value;
request.FatherName = this.formData.get('FatherName').value;
request.Address1 = this.formData.get('Address1').value;
request.Address2 = this.formData.get('Address2').value;
request.City = this.formData.get('City').value;
request.Pin = this.formData.get('Pin').value;
request.State = this.formData.get('State').value;
request.casual = this.formData.get('casual').value;
request.login = this.formData.get('login').value;
request.BankAcNo = this.formData.get('BankAcNo').value;
request.BasicCurrent = this.formData.get('BasicCurrent').value;
request.HouseRentCurrent = this.formData.get('HouseRentCurrent').value;
request.ConveyenceCurrent = this.formData.get('ConveyenceCurrent').value;
request.OtherCurrent = this.formData.get('OtherCurrent').value;
request.GrossCurrent = this.formData.get('GrossCurrent').value;
request.BasicPrevious = this.formData.get('BasicPrevious').value;
request.HouseRentPrevious = this.formData.get('HouseRentPrevious').value;
request.ConveyencePrevious = this.formData.get('ConveyencePrevious').value;
request.OtherPrevious = this.formData.get('OtherPrevious').value;
request.GrossPrevious = this.formData.get('GrossPrevious').value;
request.PayQuit = this.formData.get('PayQuit').value;
request.PFDeduct = this.formData.get('PFDeduct').value;
request.VoluntaryPF = this.formData.get('VoluntaryPF').value;
request.DateOfBirth = this.formData.get('DateOfBirth').value;
request.DateOfJoining = this.formData.get('DateOfJoining').value;
request.DateOfLeaving = this.formData.get('DateOfLeaving').value;
request.GauranterName = this.formData.get('GauranterName').value;
request.GauranterAdd1 = this.formData.get('GauranterAdd1').value;
request.GauranterAdd2 = this.formData.get('GauranterAdd2').value;
request.GauranterCity = this.formData.get('GauranterCity').value;
request.GauranterPin = this.formData.get('GauranterPin').value;
request.GauranterState = this.formData.get('GauranterState').value;
request.UANNo = this.formData.get('UANNo').value;
request.PFNo = this.formData.get('PFNo').value;
request.ESINo = this.formData.get('ESINo').value;
request.DutyTime = this.formData.get('DutyTime').value;
request.PANNo = this.formData.get('PANNo').value;
request.ADHAARNo = this.formData.get('ADHAARNo').value;
request.OtherDetails = this.formData.get('OtherDetails').value;
request.ImagePath = this.formData.get('ImagePath').value;
request.Imagename = this.formData.get('Imagename').value;
request.LoginID = this.formData.get('LoginID').value;
request.LPassword = this.formData.get('LPassword').value;
request.InTime = this.formData.get('InTime').value;
request.OutTime = this.formData.get('OutTime').value;
request.Etype = this.formData.get('Etype').value;
request.BAllocation = this.formData.get('BAllocation').value;

      this.modalService.dismissAll()
    }
    this.submitted = true
  }

  confirm(id) {
    console.log("confirm")
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      position: 'top',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.service.delete(id,"TBL_HR_EMPLOYEE_MASTER/id?id=").subscribe(response => {
          console.log(response);
        
          this.toastr.success( 'Row Deleted Successfully!','Success!');
          this._fetchData();
        });
      
      }
    });
  }
}
