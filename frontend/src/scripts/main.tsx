import { h, render } from 'preact';

import { App } from './components/app';
import { appStore } from './store/app/app-store';

if (process.env.NODE_ENV !== 'production') {
  appStore.actions$.subscribe(({ name, payload, state }) =>
    // eslint-disable-next-line no-console
    console.log('Action:', name, '\nPayload:', payload, '\nState:', state)
  );
}

render(<App />, document.body);
