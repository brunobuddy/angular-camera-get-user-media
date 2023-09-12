import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  video: HTMLVideoElement;
  snapshot: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.openCamera();
  }

  openCamera() {
    const video = document.querySelector('video');

    // Store video element for later use.
    this.video = video;

    console.log('openCamera', video);

    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: {
              exact: 'environment',
            },
          },
          audio: false,
        })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (error) {
          console.log('Something went wrong!', error);
        });
    }
  }

  takeSnapshot() {
    console.log('takeSnapshot', this.video);

    const width = this.video.offsetWidth;
    const height = this.video.offsetHeight;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    let context = canvas.getContext('2d');
    context.drawImage(this.video, 0, 0, width, height);

    this.snapshot = canvas.toDataURL('image/jpeg', 1);

    setTimeout(() => {
      const img: HTMLImageElement = document.getElementById(
        'preview'
      ) as HTMLImageElement;

      img.src = canvas.toDataURL('image/jpeg', 1);
    });
  }

  validateSnapshot() {
    console.log('validateSnapshot');
  }

  deleteSnapshot() {
    console.log('deleteSnapshot');
    this.snapshot = null;
    setTimeout(() => this.openCamera());
  }
}
