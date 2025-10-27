import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FsExampleModule } from '@firestitch/example';
import { FirstExampleComponent } from '../first-example/first-example.component';


@Component({
    templateUrl: './examples.component.html',
    standalone: true,
    imports: [FsExampleModule, FirstExampleComponent]
})
export class ExamplesComponent {
  public config = environment;
}
