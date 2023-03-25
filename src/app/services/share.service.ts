import { Injectable } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
@Injectable({
  providedIn: 'root'
})
export class ShareService {
  name = 'Angular';
  images : any[] = []
  src: any;

  constructor() {
}

  file_share(fileName: string, dsc : any , price : any , base64dataArray: any[]) {
    for (let i = 0; i < base64dataArray.length; i++) {
      console.log(i)
       Filesystem.writeFile({
        path: fileName+i+ '.jpg',
        data: base64dataArray[i].image,
        directory: Directory.Cache
       })
        .finally(() => {
           Filesystem.getUri({
            directory: Directory.Cache,
            path: fileName+i+'.jpg'
          });
        })
        .then((uriResult : any) => {
         console.log(uriResult.uri)
         console.log(this.images)
         this.images.push(uriResult.uri);
        });

    }
      console.log(this.images)
     setTimeout(() => {
      Share.share({
        // title: "Checkout This Product:" + fileName + ' Price : ' + price + 'PKR' ,
        text: "Checkout This Product:" + fileName + "\n" + ' Price: ' + price + 'PKR     ' + "\n" + 'Description: ' + dsc  ,
        files : this.images
      });
     }, 500);
    }

}
