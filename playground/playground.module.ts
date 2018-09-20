import './../tools/assets/playground.scss';

import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FsIFrameModule, FsIFrame } from '../src';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app/material.module';
import { FsExampleModule } from '@firestitch/example';
import { FsExamplesComponent } from '../tools/components/examples/examples.component';
import { ExamplesComponent } from './app/components/examples/examples.component';
import { FirstExampleComponent } from './app/components/first-example/first-example.component';
import { IFrameEmitterComponent } from './app/components/iframe-emitter/ifame-emitter.component';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsIFrameModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsExampleModule,
    RouterModule.forRoot([
      { path: '', component: ExamplesComponent, pathMatch: 'full' },
      { path: 'emitter', component: IFrameEmitterComponent },
    ])
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    FirstExampleComponent,
    ExamplesComponent,
    FsExamplesComponent,
    IFrameEmitterComponent
  ],
  providers: [
  ],
})
export class PlaygroundModule {
}
