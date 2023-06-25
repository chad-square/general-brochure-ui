import {Component, OnDestroy, OnInit} from '@angular/core';
import ScreenSizeUtils from "../../utils/ScreenSizeUtils";
import {ScreenSizeObserverService} from "../../service/widthObserverService/screen-size-observer.service";
import {Subscription, tap} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";
import MobileMenuUtils from "./mobileMenuUtils";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('toggleMobileMenu', [
      state(MobileMenuUtils.MENU_STATE.closed, style({
        left: '-300px'
      })),
      state(MobileMenuUtils.MENU_STATE.open, style({
        left: '0'
      })),
      transition(`${MobileMenuUtils.MENU_STATE.closed} => ${MobileMenuUtils.MENU_STATE.open}`, animate('400ms ease')),
      transition(`${MobileMenuUtils.MENU_STATE.open} => ${MobileMenuUtils.MENU_STATE.closed}`, animate('400ms ease'))
    ])
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {

  private screenSizeSubscription: Subscription | undefined;
  public screenSize: string | undefined;
  isOpen: string = 'closed';

  constructor(private screenSizeObserver: ScreenSizeObserverService) { }

  ngOnInit(): void {
    this.screenSizeSubscription = this.screenSizeObserver.observe().pipe(
      tap((data) => {
        this.screenSize = data
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.screenSizeSubscription?.unsubscribe();
  }

  toggleMobileMenu() {
    this.isOpen = this.isOpen === MobileMenuUtils.MENU_STATE.closed ? MobileMenuUtils.MENU_STATE.open : MobileMenuUtils.MENU_STATE.closed;
  }

  closeMobileMenu() {
    this.isOpen = MobileMenuUtils.MENU_STATE.closed;
  }




  protected readonly ScreenSizeUtils = ScreenSizeUtils;
}
