import {Directive, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ScreenSizeObserverService} from "../service/widthObserverService/screen-size-observer.service";
import {Subscription, tap} from "rxjs";
import ScreenSizeUtils from "../utils/ScreenSizeUtils";

/**
 *  sets the appropriate className given the elements' ID and current screen size
 *  Uses the ScreenSizeObserverService to detect the current screen size
 *  Constructs and adds the correct className with the elements ID and current screen size
 */
@Directive({
  selector: '[screenSizeClassNameManager]'
})
export class ScreenSizeClassNameManagerDirective implements OnInit, OnDestroy {

  private screenSizeSubscription: Subscription | undefined;

  private large = '-large';
  private medium = '-medium';
  private small = '-small';


  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private screenSizeObserver: ScreenSizeObserverService) {}

  ngOnInit(): void {
    this.screenSizeSubscription = this.screenSizeObserver.observe().pipe(
      tap((screenSize) => this.manageContent(screenSize))
    )
      .subscribe();
  }


  ngOnDestroy(): void {
    this.screenSizeSubscription?.unsubscribe();
  }

  manageContent(screenSize: string) {
    switch (screenSize) {
      case ScreenSizeUtils.SCREEN_SIZE.LARGE:
        this.renderer.removeClass(this.elementRef.nativeElement, this.elementRef.nativeElement.id + this.medium);
        this.renderer.removeClass(this.elementRef.nativeElement, this.elementRef.nativeElement.id + this.small);
        this.renderer.addClass(this.elementRef.nativeElement, this.elementRef.nativeElement.id + this.large);
        break;
      case ScreenSizeUtils.SCREEN_SIZE.MEDIUM:
        this.renderer.removeClass(this.elementRef.nativeElement, this.elementRef.nativeElement.id + this.large);
        this.renderer.removeClass(this.elementRef.nativeElement, this.elementRef.nativeElement.id + this.small);
        this.renderer.addClass(this.elementRef.nativeElement, this.elementRef.nativeElement.id + this.medium);
        break;
      case ScreenSizeUtils.SCREEN_SIZE.SMALL:
        this.renderer.removeClass(this.elementRef.nativeElement, this.elementRef.nativeElement.id + this.large);
        this.renderer.removeClass(this.elementRef.nativeElement, this.elementRef.nativeElement.id + this.medium);
        this.renderer.addClass(this.elementRef.nativeElement, this.elementRef.nativeElement.id + this.small);
        break;
      default:
        this.renderer.removeClass(this.elementRef.nativeElement, this.elementRef.nativeElement.id + this.large);
        this.renderer.removeClass(this.elementRef.nativeElement, this.elementRef.nativeElement.id + this.medium);
        this.renderer.addClass(this.elementRef.nativeElement, this.elementRef.nativeElement.id + this.small);
        break;
    }
  }

}
