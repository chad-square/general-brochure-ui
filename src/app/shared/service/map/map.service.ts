import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, of, Subscription, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private locationUrl: string = "https://maps.googleapis.com/maps/api/staticmap?center=cape+Town%2C+south+africa&zoom=12&scale=2&size=1080x1080&maptype=roadmap&format=png&key=<API_KEY>&markers=size:mid%7Ccolor:0xf10909%7%7Ccape%20Town%2C%20south%20africa"
  private blob: Blob | undefined;

  constructor(private http: HttpClient) { }

  downloadImg() {
      const httpOptions = {
        headers: new HttpHeaders({'Accept': 'image/jpeg'}),
        responseType: 'blob' as 'json'
      };
      return this.http.get<Blob>(this.locationUrl, httpOptions);
  }

}
