import { createContext } from 'preact';
import { Store } from 'small-store';

import { AppAction, AppActionPayloads, appActions } from './app-actions';
import { appEffects } from './app-effects';
import { AppState } from './app-state.interface';

const initialState: AppState = {
};

export const appStore = new Store<AppState, AppAction, AppActionPayloads>(initialState, appActions, appEffects);

export const appStoreContext = createContext(initialState);
