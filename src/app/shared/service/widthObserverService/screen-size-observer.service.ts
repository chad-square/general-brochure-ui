import {Injectable, OnInit} from '@angular/core';
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";
import {map, share} from "rxjs";
import ScreenSizeUtils from "../../utils/ScreenSizeUtils";

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeObserverService implements OnInit {
  public screenSize: string | undefined;
  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {}

  observe() {
    return this.breakpointObserver.observe(
      ['(min-width: 500px)', '(min-width: 920px)', '(min-width: 1250px)'])
      .pipe(
        map((state: BreakpointState) => this.mapToBreakpoints()),
      share());
  }

  mapToBreakpoints(): string {
    if (this.breakpointObserver.isMatched('(max-width: 500px)') && !this.breakpointObserver.isMatched(ScreenSizeUtils.BREAKPOINTS.MEDIUM)) {
      this.screenSize = ScreenSizeUtils.SCREEN_SIZE.SMALL;
      return ScreenSizeUtils.SCREEN_SIZE.SMALL
    }

    if (this.breakpointObserver.isMatched(ScreenSizeUtils.BREAKPOINTS.MEDIUM) && this.breakpointObserver.isMatched('(max-width: 920px)')) {
      this.screenSize = ScreenSizeUtils.SCREEN_SIZE.MEDIUM;
      return ScreenSizeUtils.SCREEN_SIZE.MEDIUM
    }

    if (this.breakpointObserver.isMatched(ScreenSizeUtils.BREAKPOINTS.LARGE)) {
      this.screenSize = ScreenSizeUtils.SCREEN_SIZE.LARGE;
      return ScreenSizeUtils.SCREEN_SIZE.LARGE
    }

    this.screenSize = ScreenSizeUtils.SCREEN_SIZE.MEDIUM;
    return ScreenSizeUtils.SCREEN_SIZE.MEDIUM;
  }

}
