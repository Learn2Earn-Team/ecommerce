import { ToastService } from './../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { ApicallService } from 'src/app/services/apicall.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit  {
  public user: any;
  constructor(public router: Router , public apicall: ApicallService , public global: GlobalService,public toast : ToastService) { }

  ngOnInit() {



  }


}
