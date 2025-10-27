import { Directive, ElementRef, HostListener, OnInit, Renderer2, inject } from '@angular/core';
import { postMessage } from '../../functions/post-message';


@Directive({
    selector: '[fsIFrameScrollTo]',
    standalone: true
})
export class FsIFrameScrollToDirective implements OnInit {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);


  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'fs-iframe-scrollto');
  }

  @HostListener('click', ['$event'])
  onClick(event) {
    postMessage({ name: 'scrollto', value: this.elementRef.nativeElement.getBoundingClientRect().top});
  }
}
