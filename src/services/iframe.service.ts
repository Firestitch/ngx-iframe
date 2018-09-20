import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Subscription } from 'rxjs/Subscription';
import { postMessage } from '../functions/post-message';

@Injectable()
export class FsIFrame {

  private height;

  observeBody(): Subscription {
    return IntervalObservable.create(100)
    .subscribe(() => {

      const height = window.document.documentElement.offsetHeight;

      if (this.height !== height) {
        postMessage({ name: 'height', value: height });
        this.height = height;
      }
    });
  }
}
