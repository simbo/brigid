import { Component, h, VNode } from 'preact';

export class App extends Component<{}, {}> {
  public render(props: never, state: never): VNode {
    return (
      <div class="c-app">
        {process.env.APP_NAME} {process.env.APP_VERSION} {process.env.APP_COMMIT}
      </div>
    );
  }
}
