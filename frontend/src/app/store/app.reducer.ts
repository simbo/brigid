import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { AppState } from './app.state';
import { userReducer } from './userStore/user.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  user: userReducer
};

export const appMetaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
