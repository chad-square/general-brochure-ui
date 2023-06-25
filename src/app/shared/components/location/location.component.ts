import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MapService} from "../../service/map/map.service";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy {

  private map$: Subscription | undefined;
  public linkToMap = "https://www.google.com/maps/place/Cape+Town/@-33.9145291,18.3264255,10z/data=!3m1!4b1!4m6!3m5!1s0x1dcc500f8826eed7:0x687fe1fc2828aa87!8m2!3d-33.9248685!4d18.4240553!16zL20vMDF5ajI?entry=ttu"
  public isLocationLoading: boolean = true;
  public image: string | ArrayBuffer | null | undefined;
  private blob: Blob | undefined;

  constructor(public mapSer: MapService) {
  }

  ngOnInit(): void {

    this.map$ = this.mapSer.downloadImg().pipe(
      tap((blob: Blob) => {
        this.blob = blob;
        this.createImageFromBlob(blob);
      })
    ).subscribe();
  }

  createImageFromBlob(blob: Blob) {
    const reader = new FileReader();
    reader.readAsDataURL(blob)
    reader.onload = (e) => {
      this.image = reader.result;
      this.isLocationLoading = false
    }
  }


  ngOnDestroy(): void {
    this.map$?.unsubscribe();
  }

}
