import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter,
  Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild,
} from '@angular/core';

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

  @ViewChild('container', { static: true }) 
  public container: ElementRef<HTMLDivElement>;

  @Input() public html;
  @Input() public src;
  @Input() public styles;
  @Input() public scripts: boolean = true;
  @Input() public width;
  @Input() public height;
  @Input() public sandBox: string | boolean;

  @Output() public loaded = new EventEmitter<HTMLIFrameElement>();

  private _iframe: HTMLIFrameElement;  
  private _destroy$ = new Subject();
  private _resize$ = new Subject();
  private _resizeObserver: ResizeObserver;

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes.html && !changes.html.firstChange) {
      if(this._iframe) {
        this.iframe.src = this.createHtmlBlob(this.html);
      } else {
        this.createIFrame();
      }
    }
  }

  public ngOnInit(): void {
    this.createIFrame();
  }

  public createIFrame(): void {
    let src = '';
    if(this.src) {
      src = this.src?.match(/data:image/) || this.src?.match(/\.(jpe?g|png)/) ? 
        this.createHtmlBlob(`<img src="${this.src}">`) : 
        this.src;
    } else if(this.html) {
      src = this.createHtmlBlob(this.html);
    }

    const iframe: HTMLIFrameElement = document.createElement('iframe');
      
    if(this.sandBox) {
    // Set sandbox dynamically (e.g., '' for full restrictions including no scripts)
      if(typeof this.sandBox === 'string') {
      // Or e.g., 'allow-same-origin' to disable scripts but allow other features
        iframe.setAttribute('sandbox', this.sandBox);  
      } else {
        iframe.setAttribute('sandbox', '');
      }
    }
      
    // Set content source (use src or srcdoc)
    iframe.src = src;  // Or iframe.srcdoc = '<html><body>Content</body></html>';
      
    // Optional: Set other attributes like width/height
    iframe.onload = () => {
      this.onload();
    };
      
    // Append to a container (e.g., body or a specific div)
    this.container.nativeElement.appendChild(iframe);

    this._iframe = iframe;
  }

  public createHtmlBlob(html): any {
    if(!this.scripts) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
  
      doc.querySelectorAll('script').forEach((script) => {
        const disabledScript = document.createElement('script-disabled');
        disabledScript.innerHTML = script.innerHTML;  // Copy content
        Array.from(script.attributes).forEach((attr) => {
          disabledScript.setAttribute(attr.name, attr.value);  // Copy attributes if needed
        });
        script.parentNode.replaceChild(disabledScript, script);
      });

      // Serialize the document back to a string (body innerHTML for content)
      html = doc.body.innerHTML;
    }

    const blob = new Blob([this._getDefaultStyles() + html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    return url;
  }

  public onload(): void {
    this.loaded.emit(this.iframe);
    this.updateHeight();
  }

  public get iframe(): HTMLIFrameElement {
    return this._iframe;
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

    this._resizeObserver.observe(this.container.nativeElement);
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
