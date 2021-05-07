import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy, Input, ViewChild } from '@angular/core';

import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject, fromEvent } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'fs-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
})
export class FsIFrameComponent implements OnInit, AfterViewInit, OnInit, OnDestroy {

  @ViewChild('frame')
  public frame: ElementRef;

  @Input() public html;
  @Input() public styles;

  private _destroy$ = new Subject();

  public ngOnInit(): void {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(50),
        takeUntil(this._destroy$)
      )
      .subscribe(() => {
        this.updateHeight();
      });
  }

  public onload() {
    this.updateHeight();
  }

  public get frameEl() {
    return this.frame.nativeElement;
  }

  public ngAfterViewInit() {
    if (this.html) {
      this._updateBodyFrames();
    }
  }

  private _updateBodyFrames() {
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


  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public updateHeight() {
    this.frameEl.removeAttribute('height');
    this.frameEl.setAttribute('height', this.frameEl.contentDocument.body.scrollHeight);
  }

}
