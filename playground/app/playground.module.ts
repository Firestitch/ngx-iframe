import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsIFrameModule } from 'iframe-package';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';

import { ToastrModule } from 'ngx-toastr';

import { AppMaterialModule } from './material.module';
import { FirstExampleComponent, IFrameEmitterComponent, ExamplesComponent } from './components';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
  { path: 'emmitr', component: IFrameEmitterComponent },
];


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsIFrameModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsMessageModule.forRoot(),
    ToastrModule.forRoot(),
    FsExampleModule.forRoot({ iframeObserveBody: false }),
    RouterModule.forRoot(routes),
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    IFrameEmitterComponent,
    FirstExampleComponent,
    ExamplesComponent
  ],
  providers: [
  ],
})
export class PlaygroundModule {


}
