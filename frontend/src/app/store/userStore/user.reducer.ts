import { createReducer, on } from '@ngrx/store';

import { setThemeMode } from './user.actions';
import { initialUserState, UserState } from './user.state';

export const userReducer = createReducer(
  initialUserState,
  on(setThemeMode, (state, { themeMode }): UserState => ({ ...state, themeMode }))
);
