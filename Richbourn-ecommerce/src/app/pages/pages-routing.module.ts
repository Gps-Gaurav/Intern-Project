import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: '/', pathMatch: 'full' },

  { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },

  { path: 'Cart-details', loadChildren: () => import('./cart-details/cart-details.module').then(m => m.CartDetailsModule) },

  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },

  { path: 'Checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },

  { path: 'about-us', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule) },

  { path: 'contact-us', loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule) },

  { path: '404', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },

  { path: 'account-info', loadChildren: () => import('./account-information/account-information.module').then(m => m.AccountInformationModule) },
  
  { path: 'my-account', loadChildren: () => import('./my-account/my-account.module').then(m => m.MyAccountModule) },
  
  { path: 'wishlist', loadChildren: () => import('./wishlist/wishlist.module').then(m => m.WishlistModule) },
 
  { path: 'new-arrival', loadChildren: () => import('./new-arrival/new-arrival.module').then(m => m.NewArrivalModule) },
  
  { path: 'sale', loadChildren: () => import('./sale/sale.module').then(m => m.SaleModule) },

  { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
  
  { path: 'account-password', loadChildren: () => import('./account-password/account-password.module').then(m => m.AccountPasswordModule) },
 
  { path: 'myorder', loadChildren: () => import('./myorder/myorder.module').then(m => m.MyorderModule) },


];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class PagesRoutingModule { }
