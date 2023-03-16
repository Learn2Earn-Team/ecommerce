import { Injectable } from '@angular/core';
import * as OneSignal from '@onesignal/node-onesignal';
import {environment} from '../../environments/environment';
const ONESIGNAL_APP_ID = '39afd8fb-092b-4d24-895e-790fb60207eb';
@Injectable({
  providedIn: 'root'
})
export class OneSignalService {

  constructor() { }
  async sendNotification(title:any, description:any) {
    console.log(title, description)
    const app_key_provider = {
      getToken() {
        return 'NTVmMjQzZGQtYTMwMS00NmQ1LWJhMzYtN2UyYTczNGU1ZGJl';
      }
    };
    const configuration = OneSignal.createConfiguration({
      authMethods: {
        app_key: {
          tokenProvider: app_key_provider
        }
      }
    });
    const client = new OneSignal.DefaultApi(configuration);
    const notification = new OneSignal.Notification();
    notification.app_id = ONESIGNAL_APP_ID;
    notification.included_segments = ['Subscribed Users'];
    notification.contents = {
      en: description
    };
    notification.headings = {
      en: title
    };
    notification.large_icon = 'https://ibb.co/ynKTVfs'
    const {id} = await client.createNotification(notification);
  }
}