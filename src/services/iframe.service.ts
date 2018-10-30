import { Injectable } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Subscription } from 'rxjs/Subscription';
import { postMessage } from '../functions/post-message';

@Injectable()
export class FsIFrame {

  private height;

  observeBody(): Subscription {
    return IntervalObservable.create(100)
    .subscribe(() => {
      const height = window.document.body.offsetHeight;

      if (this.height !== height) {
        this.updateHeight(height);
        this.height = height;
      }
    });
  }

  updateCurrentHeight() {
    this.updateHeight(window.document.body.offsetHeight);
  }

  updateHeight(value) {
    this.update('height', value);
  }

  update(name, value) {
    postMessage({ name: name, value: value });
  }
}
