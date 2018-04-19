import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';
import { isString } from 'lodash';

@Directive({
  selector: '[fsIFrameResizer]'
})
export class FsIFrameResizerDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:message', ['$event'])
  onMessage(event) {
    if (event.data && isString(event.data)) {

      const matches = event.data.match(/(fs-iframe-resize):(.*)/);

      if (matches && matches[1] == 'fs-iframe-resize') {

        try {

          const data = JSON.parse(matches[2]);
          this.renderer.setStyle(this.elementRef.nativeElement, 'height', data.height + 'px');

        } catch (e) {}
      }
    }
  }
}
