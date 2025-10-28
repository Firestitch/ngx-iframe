import { Directive, ElementRef, HostListener, OnInit, Renderer2, inject } from '@angular/core';

import { parseEvent } from '../../functions/parse-event';


@Directive({
  selector: '[fsIFrame]',
  standalone: true,
})
export class FsIFrameDirective implements OnInit {

  private _elementRef = inject(ElementRef);
  private _renderer = inject(Renderer2);
  private _offset = 0;

  public ngOnInit() {
    this._renderer.addClass(this._elementRef.nativeElement, 'fs-iframe');
  }

  @HostListener('window:message', ['$event'])
  public onMessage(event) {
    const data = parseEvent(event);

    switch (data.name) {
      case 'height': {

        const height = data.value;
        this._renderer.setStyle(this._elementRef.nativeElement, 'height', `${height  }px`);

    
        break;
      }
      case 'scrollto': {
        window.document.documentElement.scrollTop = data.value + this._offset;

    
        break;
      }
      case 'offset': {
        this._offset = data.value;
    
        break;
      }
    // No default
    }
  }
}
