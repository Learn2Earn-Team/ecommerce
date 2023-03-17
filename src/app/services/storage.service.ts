import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  recieved_data : any ;
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
 async set(key: string, value: any) {
   const x = JSON.stringify(value)
   await this._storage?.set(key, x);
  }
  async get(key: string){
    return await this.storage.get(key)
  }
 async delete(key : string){
    await this.storage.remove(key);
  }
  async update(key: string, value: any) {
    const x = JSON.stringify(value)
    await this._storage?.set(key, x);
   }

   async allkeys(){
    return await this.storage.keys()
   }
}