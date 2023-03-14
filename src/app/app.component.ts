import { Component , OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from "./services/global.service";
import { ApicallService } from "./services/apicall.service";
import { IonSplitPane } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';



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
                     constructor(firestore: AngularFirestore ,public global :GlobalService , public apicall : ApicallService, public router: Router) {
                      this.items = firestore.collection('items').valueChanges();
                     }

  async ngOnInit() {
    this.apicall.api_getcategory();
    this.global.Category.subscribe(res => {
      this.menu = res;

    });



      // Show the splash for two seconds and then automatically hide it:
  // await SplashScreen.show({
  //   showDuration: 4000,
  //   autoHide: true,
  // });
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
}
