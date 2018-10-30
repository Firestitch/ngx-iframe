import './../tools/assets/playground.scss';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FsIFrameModule } from '../src';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app/material.module';
import { FsExampleModule } from '@firestitch/example';
import { FirstExampleComponent, IFrameEmitterComponent, ExamplesComponent } from './app/components';

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
