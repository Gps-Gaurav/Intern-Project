import { Component , OnInit} from '@angular/core';
import { LoginService } from './core/services/authfake.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
/**
 *
 */
 currentrole: any;

constructor(private loginservice: LoginService) {


}
  ngOnInit() {
    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
    this.LoadMenu();
  }


  LoadMenu() {
    if (this.loginservice.currentUserValue != null) {
      this.currentrole = this.loginservice.GetRolebyToken();
      this.loginservice.GetMenubyrole(this.currentrole).subscribe(result => {
        //this.menulist$ = result;
        //console.log("role",result.items)
      });
    }
  }
}
