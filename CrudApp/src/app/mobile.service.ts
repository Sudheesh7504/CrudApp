import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Mobile {
  name: string;
  price: number;
  ram: string;
  storage: string;
}

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  constructor(private _http:HttpClient) { }
url="https://64f6f41a9d7754084952d870.mockapi.io/mobiles"

  fetchMobiles(){
    return this._http.get(this.url)
  }

  deleteMobiles(id: number) {
    return this._http.delete(`${this.url}/${id}`);
  }

  putMobile(id: number, body: Mobile) {
    return this._http.put(`${this.url}/${id}`, body);
  }

  postMobile(body: Mobile) {
    return this._http.post(this.url, body);
  }
}


