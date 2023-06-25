import {Component, OnDestroy, OnInit} from '@angular/core';
import {ScreenSizeObserverService} from "../../service/widthObserverService/screen-size-observer.service";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  private screenSize$: Subscription | undefined;
  public screenSize: string | undefined;

  constructor(private screenSizeObserver: ScreenSizeObserverService) {
  }

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
