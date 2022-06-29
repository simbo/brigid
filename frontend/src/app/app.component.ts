import { Component } from '@angular/core';

@Component({
  selector: 'bf-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public name = BRIGID_APP_NAME;
  public version = BRIGID_APP_VERSION;
  public commitId = BRIGID_COMMIT_ID;
}
