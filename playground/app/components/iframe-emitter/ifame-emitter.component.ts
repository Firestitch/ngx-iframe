import { Component } from '@angular/core';
import { FsIFrame } from '@firestitch/iframe';


@Component({
  templateUrl: './ifame-emitter.component.html'
})
export class IFrameEmitterComponent {
  public items = [];

  constructor(private _fsIFrame: FsIFrame) {
    this._fsIFrame.observeBody();
  }

  add() {
    this.items.push(true);
  }
}
