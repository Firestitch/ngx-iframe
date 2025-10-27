import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { postMessage } from '../../functions/post-message';


@Directive({
    selector: '[fsIFrameScrollTo]',
    standalone: true
})
export class FsIFrameScrollToDirective implements OnInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'fs-iframe-scrollto');
  }

  @HostListener('click', ['$event'])
  onClick(event) {
    postMessage({ name: 'scrollto', value: this.elementRef.nativeElement.getBoundingClientRect().top});
  }
}
