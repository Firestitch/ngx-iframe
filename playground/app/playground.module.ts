import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsIFrameModule } from '../../src/app/fs-iframe.module';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';

import { AppMaterialModule } from './material.module';
import { FirstExampleComponent, IFrameEmitterComponent, ExamplesComponent } from './components';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
  { path: 'emmitr', component: IFrameEmitterComponent },
];


@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FsIFrameModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        FormsModule,
        FsMessageModule.forRoot(),
        FsExampleModule.forRoot({ iframeObserveBody: false }),
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    ],
    declarations: [
        AppComponent,
        IFrameEmitterComponent,
        FirstExampleComponent,
        ExamplesComponent
    ],
    providers: []
})
export class PlaygroundModule {


}
