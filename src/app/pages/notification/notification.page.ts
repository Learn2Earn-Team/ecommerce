import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  public not:any = [{name: "You have a new notification. Please check your notification. This is only a test notification", time: "26 Feb 04:45 Am"}, {name: "You have a new notification. Please check your notification. This is only a test notification", time: "26 Feb 04:53 Am"}]


  constructor(public router: Router) {}



  cart(){
    this.router.navigate(['cart'])
   }

   prof(){
    this.router.navigate(['tabs/tab3'])
   }

   search(){
    this.router.navigate(['tabs/tab2'])
   }


  ngOnInit() {
  }

}
