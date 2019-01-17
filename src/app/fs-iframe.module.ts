import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsIFrameScrollToDirective } from './directives/fs-iframe-scrollto/fs-iframe-scrollto.directive';
import { FsIFrameDirective } from './directives/fs-iframe/fs-iframe.directive';
import { FsIFrame } from './services/iframe.service';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    FsIFrameScrollToDirective,
    FsIFrameDirective
  ],
  entryComponents: [
  ],
  declarations: [
    FsIFrameScrollToDirective,
    FsIFrameDirective
  ],
})
export class FsIFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsIFrameModule,
      providers: [FsIFrame]
    };
  }
}
