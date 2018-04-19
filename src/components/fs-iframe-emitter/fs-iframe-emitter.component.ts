import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";

@Component({
  selector: 'fs-iframe-emitter',
  templateUrl: 'fs-iframe-emitter.component.html'
})
export class FsIFrameEmitterComponent implements OnInit, OnDestroy {

  private subscription;
  private height;
  constructor() {
  }

  ngOnInit() {

    this.subscription = IntervalObservable.create(250)
    .subscribe( () => {
      const height = window.document.documentElement.scrollHeight;

      if (this.height !== height) {
        const data = { height: height };
        window.parent.postMessage('fs-iframe-resize:' + JSON.stringify(data), '*');
        this.height = height;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
