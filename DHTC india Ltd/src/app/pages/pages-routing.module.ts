import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DefaultComponent } from './dashboards/default/default.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
 
  { path: 'dashboard', component: DefaultComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  

  { path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule) },
 
  { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) },
 

  { path: 'charts', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
  { path: 'master', loadChildren: () => import('./master/master.module').then(m => m.MasterModule) },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
