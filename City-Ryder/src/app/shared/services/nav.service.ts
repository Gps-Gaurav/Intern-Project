import { Injectable, OnDestroy } from "@angular/core";
import { Subject, BehaviorSubject, fromEvent } from "rxjs";
import { takeUntil, debounceTime } from "rxjs/operators";
import { Router } from "@angular/router";

// Menu
export interface Menu {
  headTitle1?: string;
  headTitle2?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: "root",
})
export class NavService implements OnDestroy {
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

  // Search Box
  public search: boolean = false;

  // Language
  public language: boolean = false;

  // Mega Menu
  public megaMenu: boolean = false;
  public levelMenu: boolean = false;
  public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

  // For Horizontal Layout Mobile
  public horizontal: boolean = window.innerWidth < 991 ? false : true;

  // Full screen
  public fullScreen: boolean = false;

  constructor(private router: Router) {
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, "resize")
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
          this.megaMenu = false;
          this.levelMenu = false;
        }
        if (evt.target.innerWidth < 1199) {
          this.megaMenuColapse = true;
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }
  }

  ngOnDestroy() {
    // this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  MENUITEMS: Menu[] = [
    {
      headTitle1: "Pages",
    },
    { path: "/dashboard", icon: "search", title: "Dashboard", type: "link", bookmark: true },
    {
      title: "Custom Offers",
      icon: "home",
      type: "sub",

      active: true,
      children: [
        { path: "Custom-Offers/Give-Offer", title: "Give Offer", type: "link" },
        { path: "Custom-Offers/Offer-List", title: "Offer List", type: "link" },
      ],
    },
    {
      title: "Pass",
      icon: "home",
      type: "sub",


      children: [
        { path: "/Pass/Dynamic-Pass", title: "Dynamic Pass", type: "link" },
        { path: "/Pass/Pass-List", title: "Pass List", type: "link" },
        { path: "/Pass/User-Pass", title: "User Pass", type: "link" },
      ],
    },
    {
      title: "Booking Manager",
      icon: "home",
      type: "sub",

      children: [
        { path: "/Booking-Manager/Booking", title: "Booking", type: "link" },
        { path: "/Booking-Manager/Live-Booking", title: "Live-Booking", type: "link" },
        { path: "/Booking-Manager/No-Search-Data", title: "No-Search-Data", type: "link" },
        { path: "/Booking-Manager/TimeSuggestion", title: "Time-Suggestion", type: "link" },
        { path: "/Booking-Manager/Trip", title: "Trip", type: "link" },
      ],
    },
    {
      title: "Corporate Booking",
      icon: "home",
      type: "sub",


      children: [
        { path: "/Coorporate-Booking/Invoice", title: "Invoice", type: "link" },
        { path: "/Coorporate-Booking/Company-List", title: "Company List", type: "link" },
      ],
    },
    {
      title: "Vehicles Settings",
      icon: "home",
      type: "sub",

      children: [
        { path: "/Vehicle-Settings/VendorKMSlabPrice", title: "Vendor KM Slab Price", type: "link" },
        { path: "/Vehicle-Settings/ManageVehicleType", title: "Manage Vehicle Type", type: "link" },
        { path: "/Vehicle-Settings/Vehicle", title: "Vehicle", type: "link" },
        { path: "/Vehicle-Settings/ChangeVehicleOwner", title: "Change Vehicle Owner", type: "link" },
        { path: "/Vehicle-Settings/VehicleLayout", title: "Vehicle Layout", type: "link" },
      ],
    },
    {
      title: "Routes",
      icon: "home",
      type: "sub",

      children: [
        { path: "/routes/manage-location", title: "Manage Location", type: "link" },
        { path: "/routes/manage-route", title: "Manage Route", type: "link" },
        { path: "/routes/Route-Departure", title: "Route Departure", type: "link" },
      ],
    },
    { path: "/NonOperationalData", icon: "search", title: "Non Operational Date", type: "link",},

    {
      title: "User Manager",
      icon: "home",
      type: "sub",


      children: [
        { path: "/User-Manager/Car-Owner", title: "Car Owner", type: "link" },
        { path: "/User-Manager/Driver-List", title: "Driver List", type: "link" },
        { path: "/User-Manager/User-List", title: "User List", type: "link" },
        { path: "/User-Manager/Admin-List", title: "Admin List", type: "link" },
      ],
    },
    {
      title: "Reports",
      icon: "home",
      type: "sub",


      children: [
        { path: "/Reports/CustomerTripwise", title: "Customer Trip wise", type: "link" },
        { path: "/Reports/VehicleDayWIse", title: "Vehicle Day Wise", type: "link" },
        { path: "/Reports/VehicleTripWise", title: "Vehicle Trip Wise", type: "link" },
        { path: "/Reports/CustomerPayment", title: "Customer Payment", type: "link" },
        { path: "/Reports/VendorPayment", title: "Vendor Payment", type: "link" },
        { path: "/Reports/VendorIncentive", title: "Vendor Incentive", type: "link" },
        { path: "/Reports/UserWithPinCode", title: "User With PinCode", type: "link" },
      ],
    },

    { path: "/Live-Track", icon: "search", title: "Live Track", type: "link",  },
    { path: "/Push-Message", icon: "search", title: "PUSH Message", type: "link",  },
    { path: "/SMS-Services", icon: "search", title: "SMS Service", type: "link",  },
    { path: "/TMP-User", icon: "search", title: "TMP User", type: "link",  },
    { path: "/Fare-Chart", icon: "search", title: "Fare Chart", type: "link",},
    { path: "/Change-Password", icon: "search", title: "Change Password", type: "link", },
    { path: "/", icon: "search", title: "Logout", type: "link", },

  ];

  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
