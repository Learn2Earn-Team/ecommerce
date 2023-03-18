import { Injectable } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
@Injectable({
  providedIn: 'root'
})
export class ShareService {
  name = 'Angular';
  src: any;

  constructor() {
}

  file_share(fileName: string, dsc : any , price : any , base64data: any) {
    return Filesystem.writeFile({
     path: fileName+ '.jpg',
     data: base64data,
     directory: Directory.Cache
    })
     .then(() => {
       return Filesystem.getUri({
         directory: Directory.Cache,
         path: fileName+'.jpg'
       });
     })
     .then((uriResult : any) => {
      console.log(uriResult.uri)
      return Share.share({
        // title: "Checkout This Product:" + fileName + ' Price : ' + price + 'PKR' ,
        text: "Checkout This Product:" + fileName + "\n" + ' Price: ' + price + 'PKR     ' + "\n" + 'Description: ' + dsc  ,
        url: uriResult.uri,
      });
     });

    }

}
