import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsIFrameScrollToDirective } from './directives/fs-iframe-scrollto/fs-iframe-scrollto.directive';
import { FsIFrameDirective } from './directives/fs-iframe/fs-iframe.directive';
import { FsIFrameEmitterComponent } from './components/fs-iframe/fs-iframe.component';
import { FsIFrame } from './services/iframe.service';

export * from './services/iframe.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    FsIFrameScrollToDirective,
    FsIFrameDirective,
    FsIFrameEmitterComponent
  ],
  entryComponents: [
  ],
  declarations: [
    FsIFrameScrollToDirective,
    FsIFrameDirective,
    FsIFrameEmitterComponent
  ],
  providers: [
    FsIFrame
  ],
})
export class FsIFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsIFrameModule
    };
  }
}
