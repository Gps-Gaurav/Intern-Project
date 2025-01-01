import { Routes } from "@angular/router";

export const content: Routes = [

  {
    path: "NonOperationalData",
    loadChildren: () => import("../../components/NonOperationalData/NonOperationalData.module").then((m) => m.NonOperationalDataModule),
  },
  {
    path: "routes",
    loadChildren: () => import("../../components/routes/routes.module").then((m) => m.RoutesModule),
  },
  {
    path: "Custom-Offers",
    loadChildren: () => import("../../components/Custom-Offers/Custom-Offer.module").then((m) => m.CustomOffersModule),
  },
  {
    path: "Pass",
    loadChildren: () => import("../../components/Pass/Pass.module").then((m) => m.PassModule),
  },
  {
    path: "Booking-Manager",
    loadChildren: () => import("../../components/Booking-Manager/Booking-Manager.module").then((m) => m.BookingManagerModule),
  },
  {
    path: "Coorporate-Booking",
    loadChildren: () => import("../../components/Coorporate-Booking/Coorporate-Booking.module").then((m) => m.CoorporateBookingModule),
  },
  {
    path: "Vehicle-Settings",
    loadChildren: () => import("../../components/Vehicle-Settings/Vehicle-Settings.module").then((m) => m.VehicleSettingsModule),
  },
  {
    path: "User-Manager",
    loadChildren: () => import("../../components/User-Manager/User-Manager.module").then((m) => m.UserManagerModule),
  },
  {
    path: "Reports",
    loadChildren: () => import("../../components/Reports/Reports.module").then((m) => m.ReportsModule),
  },
  {
    path: "Live-Track",
    loadChildren: () => import("../../components/Live-Track/Live-Track.module").then((m) => m.LiveTrackModule),
  },
  {
    path: "Fare-Chart",
    loadChildren: () => import("../../components/Fare-Chart/Fare-Chart.module").then((m) => m.FareChartModule),
  },
  {
    path: "Push-Message",
    loadChildren: () => import("../../components/Push-Message/Push-Message.module").then((m) => m.PushMessageModule),
  },
  {
    path: "SMS-Services",
    loadChildren: () => import("../../components/SMS-Services/SMS-Services.module").then((m) => m.SMSServicesModule),
  },
  {
    path: "TMP-User",
    loadChildren: () => import("../../components/TMP-User/TMP-User.module").then((m) => m.TMPUserModule),
  },
  {
    path: "Change-Password",
    loadChildren: () => import("../../components/Change-Password/Change-Password.module").then((m) => m.ChangePasswordModule),
  },
];
