import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef,
  EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'fs-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsIFrameComponent implements AfterViewInit, OnDestroy, OnInit, OnChanges {

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

  constructor(
    private _domSaniizer: DomSanitizer,
    private _el: ElementRef,
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes.html && !changes.html.firstChange) {
      this.iframe.contentWindow.document.open();
      this.iframe.contentWindow.document.write(this.html);
      this.iframe.contentWindow.document.close();
    }
  }

  public ngOnInit(): void {
    if(this.src) {
      if(this.src?.match(/data:image/) || this.src?.match(/\.(jpe?g|png)/)) {
        this.html = `<img src="${this.src}">`;
        this.src = null;
      } else {
        this.src = this._domSaniizer.bypassSecurityTrustResourceUrl(this.src);
      }
    }
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

    if (this.html) {
      this._updateBodyFrames();
    }
  }

  private _updateBodyFrames(): void {
    const win: Window = this.iframe.contentWindow;
    const doc: Document = win.document;
    const data = `
    <style>
      body {
        font-family: Roboto;
        font-size: 15px;
        margin: 0 !important;
        overflow-y: hidden !important;
        width: auto !important;
      }

      a {
        color: #1155CC;
      }

      * {
        box-sizing: border-box !important;
      }

      ${this.styles}
    </style>
    ${this.html}`;

    doc.open();
    doc.write(data);
    doc.close();
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


}
