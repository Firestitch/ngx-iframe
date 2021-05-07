import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsIFrameScrollToDirective } from './directives/fs-iframe-scrollto/fs-iframe-scrollto.directive';
import { FsIFrameDirective } from './directives/fs-iframe/fs-iframe.directive';
import { FsIFrame } from './services/iframe.service';
import { FsIFrameComponent } from './../app/components/iframe';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    FsIFrameScrollToDirective,
    FsIFrameDirective,
    FsIFrameComponent,
  ],
  declarations: [
    FsIFrameScrollToDirective,
    FsIFrameDirective,
    FsIFrameComponent,
  ],
})
export class FsIFrameModule {
  static forRoot(): ModuleWithProviders<FsIFrameModule> {
    return {
      ngModule: FsIFrameModule,
      providers: [FsIFrame]
    };
  }
}
