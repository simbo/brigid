import { Actions } from 'small-store';

import { AppState } from './app-state.interface';

export enum AppAction {
  Foo = 'foo'
}

export interface AppActionPayloads {
}

export const appActions: Actions<AppState, AppAction, AppActionPayloads> = {
};
