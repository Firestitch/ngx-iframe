import { Component } from '@angular/core';

@Component({
  templateUrl: 'ifame-emitter.component.html'
})
export class IFrameEmitterComponent {
  items = [true];

  add() {
    this.items.push(true);
  }
}
