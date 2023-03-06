import { Component , OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { IonSplitPane } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('ionSplitPane') ionSplitPane!: IonSplitPane;
 
  public menu: any =[{id:1 ,icon:'stats-chart', name:'Men' , path: ''},
                     {id:2 ,icon:'map', name:'Women' , path: ''},
                     {id:2 ,icon:'map', name:'Winter' , path: ''},
                    ] 


                     clickMenuItem : any;
                     
  constructor(public route : Router) {}

  async ngOnInit() {
      // Show the splash for two seconds and then automatically hide it:
  // await SplashScreen.show({
  //   showDuration: 4000,
  //   autoHide: true,
  // });
  }
  async ngOnDestroy() {
        // Show the splash for two seconds and then automatically hide it:
    // await SplashScreen.show({
    //   showDuration: 4000,
    //   autoHide: true,
    // });
  }
  // clickMenuItem(item) {
  //   this.route.navigate([item]);

  // }
  disableIonSplitPange(){
    this.ionSplitPane.disabled = true;
      // if(item == 'login'){
    //   this.disableIonSplitPange();
    //   this.route.navigate([item]);
    // }
    // else{
    //   this.route.navigate([item]);
    // }
}
}