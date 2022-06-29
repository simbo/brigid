import { ThemeMode } from 'src/app/theme-mode/theme-mode.enum';

export const initialUserState: UserState = {
  themeMode: ThemeMode.Light
};

export interface UserState {
  themeMode: ThemeMode;
}
