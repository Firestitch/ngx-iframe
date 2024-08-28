import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'fs-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsIFrameComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild('frame')
  public frame: ElementRef;

  @Input() public html;
  @Input() public src;
  @Input() public styles;
  @Input() public width;
  @Input() public height;

  private _destroy$ = new Subject();

  public constructor(
    private _domSaniizer: DomSanitizer,
  ) {}

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
    this.updateHeight();
  }

  public get frameEl() {
    return this.frame?.nativeElement;
  }

  public ngAfterViewInit(): void {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(50),
        takeUntil(this._destroy$)
      )
      .subscribe(() => {
        this.updateHeight();
      });

    if (this.html) {
      this._updateBodyFrames();
    }
  }

  private _updateBodyFrames(): void {
    const win: Window = this.frameEl.contentWindow;
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

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public updateHeight(): void {
    if (this.frameEl?.contentDocument?.body) {
      if(this.height) {
        this.frameEl.setAttribute('height', this.height);
      } else {
        this.frameEl.removeAttribute('height');
        this.frameEl.setAttribute('height', this.frameEl.contentDocument.body.scrollHeight);
      }

      if(this.width) {
        this.frameEl.setAttribute('width', this.width);
      } else {
        this.frameEl.removeAttribute('width');
        this.frameEl.setAttribute('width', this.frameEl.contentDocument.body.scrollWidth);
      }
    }
  }

}
