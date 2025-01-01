import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { LiveTrackComponent } from './Live-Track.component';
import { LiveTrackRoutingModule } from './Live-Track-routing.module';


@NgModule({
  declarations: [
    LiveTrackComponent
  ],
  imports: [
    CommonModule,
    LiveTrackRoutingModule,
    SharedModule
  ]
})
export class LiveTrackModule { }
