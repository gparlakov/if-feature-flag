import { Component } from '@angular/core';
import { MockFeatureFlag } from './flag-module/feature-flag.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'if-feature-flag';

  constructor(private mock: MockFeatureFlag) {}

  onToggleFlag() {
    this.mock.toggle();
  }
}
