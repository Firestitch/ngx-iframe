import { Component } from '@angular/core';
import { FsIFrame } from 'iframe-package';

@Component({
  templateUrl: 'ifame-emitter.component.html'
})
export class IFrameEmitterComponent {
  public items = [];

  constructor(private fsIFrame: FsIFrame) {
    this.fsIFrame.observeBody();
  }

  add() {
    this.items.push(true);
  }
}
