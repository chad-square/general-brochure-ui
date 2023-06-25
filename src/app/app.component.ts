import {Component, OnDestroy, OnInit} from '@angular/core';
import {ScreenSizeObserverService} from "./shared/service/widthObserverService/screen-size-observer.service";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'general-brochure-ui';
  public screenSize: string | undefined;
  private subscription: Subscription | undefined;



  constructor(private screenSizeObserverService: ScreenSizeObserverService) {
  }

  ngOnInit(): void {
    this.subscription = this.screenSizeObserverService.observe().pipe(
      tap(data => this.screenSize = data)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }




}
