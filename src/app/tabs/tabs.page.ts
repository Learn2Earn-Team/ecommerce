import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { ApicallService } from 'src/app/services/apicall.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage  {
  public user: any;
  constructor(public router: Router , public apicall: ApicallService , public global: GlobalService) { }
  verify(){
    this.global.User.subscribe(res => {
      this.user = res;
      console.log(this.user);
    });
    if(this.user === '')
    {
      this.router.navigate(['login']);
    }
    else{
      console.log('ali');
      this.router.navigate(['tabs/tab3']);
      
    }
    console.log('test');

    
  }
}
