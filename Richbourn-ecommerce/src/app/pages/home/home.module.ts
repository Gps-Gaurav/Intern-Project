import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LatestProductComponent } from './latest-product/latest-product.component';
import { FeaturedProductComponent } from './featured-product/featured-product.component';
import { CategoryComponent } from './category/category.component';
import { StoriesComponent } from './stories/stories.component';
import { BannerComponent } from './banner/banner.component';
const routes: Routes = [
  {
      path: '',
      component: HomeComponent
  },
 
];

@NgModule({
  declarations: [
    HomeComponent,CarouselComponent, LatestProductComponent, FeaturedProductComponent, CategoryComponent, StoriesComponent, BannerComponent
  ],
  imports: [
    CommonModule,CarouselModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
