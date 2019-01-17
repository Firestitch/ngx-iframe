import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { postMessage } from '../functions/post-message';


@Injectable()
export class FsIFrame {

  private height;

  observeBody(): Subscription {
    return interval(100)
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
