import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsIFrameEmitterComponent } from './components/fs-iframe-emitter/fs-iframe-emitter.component';
import { FsIFrameResizerDirective } from './directives/fs-iframe-resizer/fs-iframe-resizer.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    FsIFrameEmitterComponent,
    FsIFrameResizerDirective
  ],
  entryComponents: [
  ],
  declarations: [
    FsIFrameEmitterComponent,
    FsIFrameResizerDirective
  ],
  providers: [
  ],
})
export class FsIFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsIFrameModule
    };
  }
}
