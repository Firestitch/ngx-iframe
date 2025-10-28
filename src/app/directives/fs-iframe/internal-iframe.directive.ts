import { Directive, ElementRef, Input, OnInit, Renderer2, inject } from '@angular/core';


@Directive({
  selector: 'iframe',
  standalone: true,
})
export class InternalIFrameDirective implements OnInit {

  @Input() public sandBox: string | boolean;

  private _elementRef = inject(ElementRef);
  private _renderer = inject(Renderer2);

  public ngOnInit() {
    if (this.sandBox) {
      if (typeof this.sandBox === 'string') {
        this._renderer.setAttribute(this._elementRef.nativeElement, 'sandbox', this.sandBox);
      } else {
        this._renderer.setAttribute(this._elementRef.nativeElement, 'sandbox', '');
      }
    }
  }
}
