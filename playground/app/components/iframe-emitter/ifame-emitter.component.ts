import { Component, inject } from '@angular/core';
import { FsIFrame } from '@firestitch/iframe';
import { MatButton } from '@angular/material/button';
import { FsIFrameScrollToDirective } from '../../../../src/app/directives/fs-iframe-scrollto/fs-iframe-scrollto.directive';


@Component({
    templateUrl: './ifame-emitter.component.html',
    standalone: true,
    imports: [MatButton, FsIFrameScrollToDirective]
})
export class IFrameEmitterComponent {
  private _fsIFrame = inject(FsIFrame);

  public items = [];

  constructor() {
    this._fsIFrame.observeBody();
  }

  add() {
    this.items.push(true);
  }
}
