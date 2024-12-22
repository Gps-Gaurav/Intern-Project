import { Component, OnInit, Output, EventEmitter, Inject, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from '../../core/services/auth.service';
import { LoginService } from '../../core/services/authfake.service';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {
  items: MenuItem[];
  element;
  cookieValue;
  flagvalue;
  countryName;
  valueset;
  
  displayResponsive: boolean;

  financial_year="";
  app_name="";
  app_title="";
  appcount=0;
  constructor(@Inject(DOCUMENT) private document: any, private router: Router, private authService: AuthenticationService,
    private authFackservice: LoginService,
    public languageService: LanguageService,
    public translate: TranslateService,
    public _cookiesService: CookieService) {
  }

  listLang = [
   
  ];

  openMobileMenu: boolean;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  ngOnInit() {
    this.items = [
      {
        label: 'Dashboards',
        icon: 'bx bx-home-circle',
        styleClass: 'menu-link',
        routerLink: '/dashboard'
      },

      {
        label: 'Master',
        icon: 'bx bx-store',
        items: [

          {
            label: 'Finished Goods',
            icon: 'pi pi-fw pi-calendar',
            items: [
              {
                label: 'Category',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/category'
              },
              {
                label: 'Sub Category',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/subcategory'
              },
              {
                label: 'Group',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/group'
              },
              {
                label: 'Accunt Group',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/account-group'
              },
              {
                label: 'Account Sub Group',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/account_sub_group'
              },
              {
                label: 'Product',
                icon: 'pi pi-fw pi-calendar-plus',
                routerLink: '/master/product'
              },


            ]

          },
          {
            label: 'Raw Materials',
            icon: 'pi pi-fw pi-calendar',
            items: [
              {
                label: 'Raw Category',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/raw-category'
              },
              {
                label: 'Raw Subcategory',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/raw-subcategory'
              },
              {
                label: 'Item',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/item'
              },
              {
                label: 'Account Group',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/account-group'
              },
            ]

          },
          {
            label: 'Common',
            icon: 'pi pi-fw pi-calendar',
            items: [
              {
                label: 'Color',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/color'
              },


              {
                label: 'Currency',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/currency'
              },
              {
                label: 'Unit',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/unit'
              },
              {
                label: 'Series',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/series'
              },
              {
                label: 'State',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/state'
              },
              {
                label: 'City',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/city'
              },
              {
                label: 'Location',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/location'
              },
              {
                label: 'Ledger',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/ledger'
              },
              {
                label: 'Party',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/party'
              },
              {
                label: 'Party wise discount setup',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/party-discount'
              },
              {
                label: 'Series Tax Setup',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/invoices/series-tax-setup'
              },
            ]

          },

          {
            label: 'Opening Stock',
            icon: 'pi pi-fw pi-calendar',
            items: [

              {
                label: 'Finished Goods',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/OpStock'
              },
              {
                label: 'Raw Material',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/OpStock-raw-material'
              },
              {
                label: 'User',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/user'
              },
              {
                label: 'Company',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/company'
              },
              {
                label: 'Size',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/master/Size'
              },
            ]

          },




        ]
      },
      // {
      //   label: 'Edit',
      //   icon: 'pi pi-fw pi-pencil',
      // items: [
      //   {
      //     label: 'Left',
      //     icon: 'pi pi-fw pi-align-left'
      //   },
      //   {
      //     label: 'Right',
      //     icon: 'pi pi-fw pi-align-right'
      //   },
      //   {
      //     label: 'Center',
      //     icon: 'pi pi-fw pi-align-center'
      //   },
      //   {
      //     label: 'Justify',
      //     icon: 'pi pi-fw pi-align-justify'
      //   },

      //   ]
      // },
      {
        label: 'Invoice',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Finished Goods',
            icon: 'pi pi-fw pi-calendar',
            items: [
              {
                label: 'Purchase Invoice',
                icon: 'pi pi-fw pi-user-plus',
                routerLink: '/invoices/Purchase'
              },
              {
                label: 'Sale Invoice',
                icon: 'pi pi-fw pi-user-minus',
                routerLink: '/invoices/SaleInvoice'
              },
           
              {
                label: 'Purchase Return',
                icon: 'pi pi-fw pi-user-minus',
                routerLink: '/invoices/PurchaseReturn'
              },
              {
                label: 'Sale Return',
                icon: 'pi pi-fw pi-user-minus',
                routerLink: '/invoices/SaleReturn'
              },
              {
                label: 'Stock Transfer',
                icon: 'pi pi-fw pi-user-minus',
                routerLink: '/invoices/Stock_Transfer'
              },

              {
                label: 'Product Stock Report',
                icon: 'pi pi-fw pi-user-minus',
                routerLink: '/invoices/product-stock-report'
              },


            ]

          },
          {
            label: 'Raw Materials',
            icon: 'pi pi-fw pi-calendar',
            items: [
              {
                label: 'Raw Purchase',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/invoices/Purchase_Raw'
              },
              {
                label: 'Raw Sales',
                icon: 'pi pi-fw pi-calendar',
                routerLink: '/invoices/Sales_Raw'
              },
               {
                 label: 'barcode generation',
                 icon: 'pi pi-fw pi-calendar',
                 routerLink: '/invoices/barcode-generation'
               },
              {
                label: 'Item Stock Report',
                icon: 'pi pi-fw pi-user-minus',
                routerLink: '/invoices/item-stock-report'
              },
            ]

          },

        ]
      },
    
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.logout()
      }
    ];
    if(localStorage.getItem("app_name")==="work"){
      this.app_title="Welcome to WORK";
      this.app_name="work";
    }
    else{
      this.app_title="Welcome to OPA INDIA";
      this.app_name="op";
    }
    this.openMobileMenu = false;
    this.element = document.documentElement;


     this.getCurrentFinancialYear();
      this.financial_year=localStorage.getItem('currentYear');
  }

  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
    if (environment.defaultauth === 'firebase') {
      this.authService.logout();
    } else {
      this.authFackservice.logout();
    }
    this.router.navigate(['/account/login']);
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }


   getCurrentFinancialYear() {
    const thisYear = (new Date()).getFullYear();
    const yearArray = [0, 1, 2, 3, 4].map((count) => `${thisYear - count}-${(thisYear - count - 1).toString().slice(-2)}`);
    console.log(yearArray);
    return yearArray.join();
  }

  Logofetch(){
    if(localStorage.getItem("app_name")!="work"){
    if(this.appcount==5){
       this.showModalDialog(); 
    }
    this.appcount++;
  }
  }

  showModalDialog() {
    this.displayResponsive = true;
  }
  ChangePopup() {
    this.displayResponsive = false;
    localStorage.setItem("app_name","work");
    window.location.reload();
  }
  ChangeAppName(){
    localStorage.setItem("app_name","");
    window.location.reload();
  }
}
