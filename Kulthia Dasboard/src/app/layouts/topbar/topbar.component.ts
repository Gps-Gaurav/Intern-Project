import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
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
  styleUrls: ['./topbar.component.scss']
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

  constructor(@Inject(DOCUMENT) private document: any, private router: Router, private authService: AuthenticationService,
    private authFackservice: LoginService,
    public languageService: LanguageService,
    public translate: TranslateService,
    public _cookiesService: CookieService) {
  }

  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
    { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
    { text: 'Italian', flag: 'assets/images/flags/italy.jpg', lang: 'it' },
    { text: 'Russian', flag: 'assets/images/flags/russia.jpg', lang: 'ru' },
  ];

  openMobileMenu: boolean;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();



  ngOnInit() {
    this.items = [
      {
        label: 'Open',
        icon: 'pi pi-fw pi-file',
        items: [
         
        ]
      },
      {
        label: 'Trading',
        icon: 'pi pi-fw pi-file',
        items: [
         
        ]
      },
      {
        label: 'Manufacturing',
        icon: 'pi pi-fw pi-file',
        items: [
        
        ]
      },
      {
        label: 'Master',
        icon: 'pi pi-fw pi-user',
        items: [
        
          {
            label: 'Inventory',
            icon: 'pi pi-fw pi-users',
            items: [
              
              {
                label: 'Item Group Master',
                icon: 'pi pi-fw pi-external-link',
                routerLink: '/master/item'
              },
              {
                separator: true
              },
              {
                label: 'Item Master',
                icon: 'pi pi-fw pi-external-link',
                routerLink: '/master/item'
              },
            
             
              {
                separator: true
              },
             
              {
                label: 'Unit Master',
                icon: 'pi pi-fw pi-external-link',
                routerLink: '/master/unit'
              },
              {
                separator: true
              },
              {
                label: 'Unit Relation',
                icon: 'pi pi-fw pi-external-link',
                routerLink: '/master/unit_relation'
              },
              {
                separator: true
              },
              {
                label: 'Diamond Properties',
                icon: 'pi pi-fw pi-external-link',
                routerLink: '/master/diamond'
              },
          
             
            ]
          },
          
          {
            label: 'Opening Stock',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Raw Material(Packet Wise)',
                icon: 'pi pi-fw pi-external-link',
                routerLink: '/master/packet'
              },
              {
                label: 'Finished Goods',
                icon: 'pi pi-fw pi-external-link',
                routerLink: '/invoices/finished-goods'
              },
              {
                label: 'Finished Goods Bulk',
                icon: 'pi pi-fw pi-external-link',
                routerLink: '/invoices/insert-finished-goods'
              },
              {
                label: 'Ghat Stock',
                icon: 'pi pi-fw pi-external-link',
                routerLink: '/invoices/op-stock-ghat-list'
              },
              {
                label: 'Customer Stock',
                icon: 'pi pi-fw pi-external-link',
                routerLink: '/invoices/op-stock-customer'
              },
              {
                label: 'Joober Stock',
                icon: 'pi pi-fw pi-external-link',
                routerLink: '/master/insert-opening-stock'
              }
            ]
          },
          {
            label: 'Purchase',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Raw Material(Packet Wise)',
                icon: 'pi pi-fw pi-external-link',
                routerLink: '/invoices/purchase-raw-material'
              },
              {
                label: 'Finished Goods',
                icon: 'pi pi-fw pi-external-link',
                routerLink: '/invoices/Purchase-finished-goods'
              },
              {
                label: 'Finished Goods Bulk',
                icon: 'pi pi-fw pi-external-link',
                routerLink: '/invoices/insert-finished-goods'
              }
              
            ]
          },
          {
            label: 'Sale',
            icon: 'pi pi-fw pi-users',
            items: [
           {
                label: 'Finished Goods',
                icon: 'pi pi-fw pi-external-link',
                routerLink: '/invoices/sale-finished-goods'
              },
              {
                label: 'Finished Goods Bulk',
                icon: 'pi pi-fw pi-external-link',
                routerLink: '/invoices/insert-finished-goods'
              }
              
            ]
          },
          
          {
            label: 'Finished Product Category',
            icon: 'pi pi-fw pi-external-link',
            routerLink: '/invoices/Finished_Product_Category'
          },
          {
            label: 'Price List',
            icon: 'pi pi-fw pi-external-link',
            routerLink: '/invoices/price-list'
          },
          {
            label: 'Company Setup',
            icon: 'pi pi-fw pi-external-link',
            routerLink: '/invoices/price-list'
          },
          {
            label: 'Jobber Making/Purity Setup',
            icon: 'pi pi-fw pi-external-link',
            routerLink: '/invoices/price-list'
          },
          {
            label: 'Auto Numbering Setup',
            icon: 'pi pi-fw pi-external-link',
            routerLink: '/invoices/price-list'
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
        label: 'Accounts',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',

          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus',

          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print'
                  }
                ]
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List'
              }
            ]
          }
        ]
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus'
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus'
              },

            ]
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          }
        ]
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off'
      }
    ];
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
}
