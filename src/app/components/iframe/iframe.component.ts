import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'fs-iframe',
    templateUrl: './iframe.component.html',
    styleUrls: ['./iframe.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class FsIFrameComponent implements AfterViewInit, OnDestroy, OnInit, OnChanges {
  private _domSaniizer = inject(DomSanitizer);
  private _el = inject(ElementRef);


  @ViewChild('frame')
  public frame: ElementRef;

  @Input() public html;
  @Input() public src;
  @Input() public styles;
  @Input() public width;
  @Input() public height;

  @Output() public loaded = new EventEmitter<HTMLIFrameElement>();

  private _destroy$ = new Subject();
  private _resize$ = new Subject();
  private _resizeObserver: ResizeObserver;

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes.html && !changes.html.firstChange) {
      this.src = this.createHtmlBlob(this.html);
    }
  }

  public ngOnInit(): void {
    if(this.src) {
      this.src = this.src?.match(/data:image/) || this.src?.match(/\.(jpe?g|png)/) ? 
        this.createHtmlBlob(`<img src="${this.src}">`) : 
        this._domSaniizer.bypassSecurityTrustResourceUrl(this.src);
    } else if(this.html) {
      this.src = this.createHtmlBlob(this.html);
    }
  }

  public createHtmlBlob(html): SafeResourceUrl {
    const blob = new Blob([this._getDefaultStyles() + html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    return this._domSaniizer.bypassSecurityTrustResourceUrl(url);
  }

  public onload(): void {
    this.loaded.emit(this.iframe);
    this.updateHeight();
  }

  public get iframe(): HTMLIFrameElement {
    return this.frame?.nativeElement;
  }

  public ngAfterViewInit(): void {
    this._resizeObserver = new ResizeObserver(() => {
      this._resize$.next(null);
    });
    
    this._resize$
      .pipe(
        debounceTime(100),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.updateHeight();
      });

    this._resizeObserver.observe(this._el.nativeElement);
  }

  public updateHeight(): void {
    if (this.iframe?.contentDocument?.body) {
      if(this.height) {
        this.iframe.setAttribute('height', this.height);
      } else {
        this.iframe.removeAttribute('height');
        this.iframe.setAttribute('height', this.iframe.contentDocument.body.scrollHeight.toString());
      }

      if(this.width) {
        this.iframe.setAttribute('width', this.width);
      } else {
        this.iframe.removeAttribute('width');
        this.iframe.setAttribute('width', this.iframe.contentDocument.body.scrollWidth.toString());
      }
    }
  }

  public ngOnDestroy(): void {
    this._resizeObserver.disconnect();
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  private _getDefaultStyles(): string {
    return `
    <style>
      body {
        font-family: Roboto;
        font-size: 15px;
        margin: 0;
        overflow-y: hidden;
        width: auto;
      }

      a {
        color: #1155CC;
      }

      * {
        box-sizing: border-box;
      }

      ${this.styles}
    </style>
    `;
  }


}
