import { Injectable } from '@angular/core';
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toast : ToastController) { }


  async presentToast(msg : string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 1000,
      mode : 'ios',
      position:'top',
      cssClass : "css_toast"
    });
    toast.present();
  }
}
