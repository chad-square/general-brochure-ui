import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ScreenSizeObserverService} from "../../shared/service/widthObserverService/screen-size-observer.service";
import {Subscription, tap} from "rxjs";
@Component({
  selector: 'app-hero-slider',
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.scss']
})
export class HeroSliderComponent  implements OnInit, OnDestroy {

  private screenSizeSubscription: Subscription | undefined;
  public screenSize: string | undefined;

  @ViewChild('heroImage') heroImage: ElementRef | undefined;

  private HERO_IMAGE_PATH: string = '../../../assets/hero_images';
  public currentHeroImage: string = '../../../assets/hero_images/hero1.jpg';
  private heroImages = ['hero1', 'hero2', 'hero3', 'hero4'];
  private HERO_SLIDER_TIMING: number = 3000;
  private interval: number | undefined;

  constructor(private renderer: Renderer2, private screenSizeObserver: ScreenSizeObserverService) {
  }

  ngOnInit(): void {
    this.screenSizeSubscription = this.screenSizeObserver.observe().pipe(
      tap((data) => {
        this.screenSize = data
      })
    ).subscribe();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.screenSizeSubscription?.unsubscribe();
  }

  private startAutoSlide() {
    this.interval = setInterval(() => {
      this.slide('right');
    }, this.HERO_SLIDER_TIMING);
  }

  clearAutoSlideTimeout() {
    window.clearInterval(this.interval)
  }

  slide(direction: string) {
    this.clearAutoSlideTimeout()

    const imageIndex: number = this.extractImageIndex(this.currentHeroImage);
    const updatedImage: string = this.findNextImage(direction, imageIndex);
    this.currentHeroImage = `${this.HERO_IMAGE_PATH}/${updatedImage}.jpg`;

    this.startAutoSlide();
  }

  private findNextImage(direction: string, imageIndex: number): string {
    let updatedImage: string = '';
    const imageNamePrefix: string = 'hero';

    if (direction === 'left') {
      imageIndex--;
      updatedImage = `${imageNamePrefix}${imageIndex}`;
      if (this.heroImages.indexOf(updatedImage) === -1) {
        updatedImage = this.heroImages[this.heroImages.length - 1];
      }
    }

    if (direction === 'right') {
      imageIndex++;
      updatedImage = `${imageNamePrefix}${imageIndex}`;
      if (this.heroImages.indexOf(updatedImage) === -1) {
        updatedImage = this.heroImages[0];
      }
    }

    return updatedImage;
  }

  private extractImageIndex(currentSrc: string): number {
    const imageIndex = currentSrc.substring(32);
    return +imageIndex.substring(0, imageIndex.indexOf('.'));
  }
}
