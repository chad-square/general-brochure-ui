import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, tap} from "rxjs";
import {ScreenSizeObserverService} from "../shared/service/widthObserverService/screen-size-observer.service";
import {MapService} from "../shared/service/map/map.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private screenSize$: Subscription | undefined;
  public screenSize: string | undefined;


  constructor(private screenSizeObserver: ScreenSizeObserverService) { }

  ngOnInit(): void {
    this.screenSize$ = this.screenSizeObserver.observe().pipe(
      tap((data) => {
        this.screenSize = data
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.screenSize$?.unsubscribe();
  }


}
