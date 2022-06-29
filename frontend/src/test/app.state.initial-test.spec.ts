import { recursive } from 'merge';

import { AppState } from 'src/app/store/app.state';
import { ThemeMode } from 'src/app/theme-mode/theme-mode.enum';

export const initialAppStateForTesting: AppState = {
  user: {
    themeMode: ThemeMode.Light
  }
};

export function getMockState(partialState: any = {}): { initialState: AppState } {
  return {
    initialState: recursive(true, initialAppStateForTesting, partialState)
  };
}
