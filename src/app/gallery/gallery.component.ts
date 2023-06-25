import {Component, ElementRef, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {

  @ViewChild('viewedImageModalTemplate') viewedImageModalTemplate: TemplateRef<any> | undefined;
  @ViewChild('galleryContainer') galleryContainer: ElementRef | undefined;
  public selectedImage: string | undefined;
  currentImageIndex: number = -1;

  public images = [
    '../../assets/img/ocean1.jpg',
    '../../assets/img/building1.jpg',
    '../../assets/img/ocean1.jpg',
    '../../assets/img/building1.jpg',
    '../../assets/img/ocean1.jpg',
    '../../assets/img/building1.jpg',
    '../../assets/img/ocean1.jpg',
    '../../assets/img/building1.jpg',
  ]

  constructor(public dialog: MatDialog) {
  }

  openImage(imageUrl: string, imageIndex: number) {
    this.selectedImage = imageUrl;
    if (this.galleryContainer?.nativeElement.classList.contains('gallery-container-small')) {
      // @ts-ignore
      this.dialog.open(this.viewedImageModalTemplate,{
        height: '60vh',
        width: '90vw'
      })
    }

    if (this.galleryContainer?.nativeElement.classList.contains('gallery-container-medium')
      || this.galleryContainer?.nativeElement.classList.contains('gallery-container-large')) {
      // @ts-ignore
      this.dialog.open(this.viewedImageModalTemplate,{
        height: '90vh',
        width: '90vw'
      })
    }
    this.currentImageIndex = imageIndex;


    this.dialog.afterAllClosed.subscribe(result => {
      this.closeImage()
    });
  }

  closeImage() {
    this.selectedImage = '';
    this.dialog.closeAll();
  }

  nextImage(direction: string) {

    if (direction === 'forward') {
      if (this.currentImageIndex === this.images.length - 1) {
        this.currentImageIndex = 0;
      }
      this.currentImageIndex++;
      this.selectedImage = this.images[this.currentImageIndex];
    }

    if (direction === 'back') {
      if (this.currentImageIndex === 0) {
        this.currentImageIndex = this.images.length - 1;
      }
      this.currentImageIndex--;
      this.selectedImage = this.images[this.currentImageIndex];
    }
  }

}
