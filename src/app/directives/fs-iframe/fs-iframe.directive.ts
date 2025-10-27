import { Directive, Renderer2, ElementRef, HostListener, OnInit } from '@angular/core';

import { parseEvent } from '../../functions/parse-event';


@Directive({
    selector: '[fsIFrame]',
    standalone: true
})
export class FsIFrameDirective implements OnInit {

  private offset = 0;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'fs-iframe');
  }

  @HostListener('window:message', ['$event'])
  onMessage(event) {
    const data = parseEvent(event);

    if (data.name === 'height') {

        const height = data.value;
        this.renderer.setStyle(this.elementRef.nativeElement, 'height', height + 'px');

    } else if (data.name === 'scrollto') {
      window.document.documentElement.scrollTop = data.value + this.offset;

    } else if (data.name === 'offset') {
      this.offset = data.value;
    }
  }
}
