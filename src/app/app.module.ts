import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
const environment:any = {firebaseConfig : {
  apiKey: "AIzaSyBn5l4CnlqYBPynZvr7g11v8gh0So4I-D8",
  authDomain: "ar-collections-5a176.firebaseapp.com",
  projectId: "ar-collections-5a176",
  storageBucket: "ar-collections-5a176.appspot.com",
  messagingSenderId: "823341874207",
  appId: "1:823341874207:web:82ac089085442153bf292a",
  measurementId: "G-TPLW496FEY"
},
CountryJson: [
  { name: 'Pakistan', dial_code: '+92', code: 'PK' }
]}


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
      AngularFirestoreModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
