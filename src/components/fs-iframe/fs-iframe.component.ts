import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FsIFrame } from '../../services/iframe.service';
import { postMessage } from '../../functions/post-message';
import { toInteger } from 'lodash';

@Component({
  selector: 'fs-iframe',
  template: ''
})
export class FsIFrameEmitterComponent implements OnInit, OnDestroy {

  @Input() offset = 0;
  private subscription;
  constructor(private fsIFrame: FsIFrame) {}

  ngOnInit() {
    this.subscription = this.fsIFrame.observeBody();

    if (this.offset) {
      postMessage({ name: 'offset', value: toInteger(this.offset) });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    postMessage({ name: 'offset', value: 0 });
  }
}
