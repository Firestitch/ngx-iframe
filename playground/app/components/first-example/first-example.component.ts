import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'first-example',
  templateUrl: 'first-example.component.html',
  styleUrls: ['first-example.component.css']
})
export class FirstExampleComponent {

  url;

  constructor(private sanitizer: DomSanitizer) {
    let url = '/emitter';

    if (<any>window.location.port !== 80) {
      url = window.location.origin + url;
    }

    this.url = sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
