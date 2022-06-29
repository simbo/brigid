import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ThemeMode } from 'src/app/theme-mode/theme-mode.enum';

import { UserState } from './user.state';

export const selectUser = createFeatureSelector<UserState>('user');

export const selectThemeMode = createSelector(selectUser, (state: UserState) => state.themeMode);

export const selectThemeModeSwitchTarget = createSelector(selectThemeMode, themeMode =>
  themeMode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark
);

export const selectThemeModeSwitchIcon = createSelector(selectThemeModeSwitchTarget, target => `${target}_mode`);

export const selectThemeModeSwitchLabel = createSelector(
  selectThemeModeSwitchTarget,
  target => `enable ${target} mode`
);
