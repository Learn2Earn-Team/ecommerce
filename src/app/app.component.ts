import { Component , OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from "./services/global.service";
import { ApicallService } from "./services/apicall.service";
import { IonSplitPane } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { StorageService } from './services/storage.service';
import OneSignal from 'onesignal-cordova-plugin';


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
                     items: Observable<any[]>;
                     constructor(public storage : StorageService , firestore: AngularFirestore ,public global :GlobalService , public apicall : ApicallService, public router: Router) {
                      this.items = firestore.collection('items').valueChanges();
                     }

  async ngOnInit() {
    this.OneSignalInit();
    this.apicall.api_getcategory();
    this.apicall.api_getSlides()
    this.global.Category.subscribe(res => {
      this.menu = res;

    });

  this.storage.get("login").then(res=>{
      let data = JSON.parse(String(res))
       if(data != null){
        console.log("in")
           this.global.set_User(data)
       }
       console.log(data)
  })



  // if(await data){
  //   console.log(data.)
  //   this.global.set_User(data)
  // }


      // Show the splash for two seconds and then automatically hide it:
  // await SplashScreen.show({
  //   showDuration: 4000,
  //   autoHide: true,
  // });
  }
  ionViewDidEnter(){
    this.OneSignalInit();
  } 
  goto(value: any) {
    this.router.navigate(['catagory']);
    console.log(value);
    this.apicall.api_productbycategory(value.c_id);
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
 // One SIgnal
 OneSignalInit() {
  OneSignal.setAppId('5276cbab-c3b9-4b19-860f-0521a83460ef');
  OneSignal.setNotificationOpenedHandler(function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  });
}
}
